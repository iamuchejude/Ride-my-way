const db = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const env = require('dotenv');

env.config();

class Auth {
    static login(req, res) {
        const { email, password } = req.body;
        let user = {};

        if((email == null || undefined) || (password == null || undefined)) {
            res.status(400).json({
                status: 'error',
                message: 'Bad Request',
            });
        }

        db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
            if(err) {
                res.status(500).json({
                    status: 'error',
                    message: 'Unexpected error occured!',
                })
            } else {
                if(result.rowCount < 1) {
                    res.status(404).json({
                      status: 'error',
                      message: 'Email is not registered'
                    });
                } else {
                    if(bcrypt.compareSync(password, result.rows[0].password)) {
                        res.status(401).json({
                            status: 'error',
                            message: 'Password is incorect',
                        })
                    } else {
                        user.setAttribute('id', result.rows[0].id);
                        user.setAttribute('email', result.row[0].id);
                    }
                }
            }
        });

        jwt.sign({user}, 'secrete_key', (err, token) => {
            if(err) {
                res.json({
                    status: 'error',
                    message: 'Authentication failed',
                    error: err
                });
            } else {
                res.status(200).json({
                    status: 'error',
                    message: 'Authentication successful',
                    user,
                    token,
                })
            }
        });
    }

    static register(req, res) {
        const { name, email, password } = req.body;

        db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
            if(err) {
                res.status(500).json({
                    message: 'Error Occured',
                });
            } else {
                if(result.rowCount > 1) {
                    res.status(200).json({
                        message: 'Email is registered',
                    });
                } else {
                    const ecryptedPassword = bcrypt.hashSync(password, process.env.HASH_SALT);
                    const uid = uuid.v3(name, process.env.UUID_NAMESPACE);
                    
                    db.query('INSERT INTO users(id, name, email, password) VALUES ($1, $2, $3, $4)', [uid, name, email, password], (err, result) => {
                        if(err) {
                            res.status(500).json({
                                message: 'Registration Failed.',
                            })
                        } else {
                            res.status(201).json({
                                status: 'success',
                                message: 'Account Created',
                                data: result.rows,
                            });
                        }
                    });
                }
            }
        });
    }
}

module.exports = Auth;