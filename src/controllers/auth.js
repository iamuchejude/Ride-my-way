import db from '../database/connection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uuidv1 from 'uuid/v1';
import env from 'dotenv';

env.config();

class Auth {
    static login(req, res) {
        const { email, password } = req.body;

        if((email === null || undefined) || (password === null || undefined)) {
            res.status(400).json({
                status: 'error',
                message: 'Bad Request',
            })
        } else {
            db.query('SELECT * FROM users WHERE email=$1', [email])
                .then((result) => {
                    if(result.rowCount < 1) {
                        res.status(404).json({
                            status: 'error',
                            message: 'Auth Failed! Email is not registered',
                        });
                    } else {
                        const comparePassword = bcrypt.compareSync(password, result.rows[0].password);
                        if(!comparePassword) {
                            res.status(401).json({
                                status: 'error',
                                message: 'Auth Failed! Password is incorrect',
                                data: result.rows[0],
                            })
                        } else {
                            let user = {
                                id: result.rows[0].id,
                                isAuth: true,
                            }
                            
                            jwt.sign({ user }, process.env.JWT_SECRET_TOKEN, { expiresIn: '20h' }, (error, token) => {
                                if(error) {
                                    res.status(522).json({
                                        status: 'error',
                                        message: 'Auth Failed!',
                                        error,
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'success',
                                        message: 'Auth Successful!',
                                        user,
                                        token,
                                    })
                                }
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        status: 'error',
                        message: 'Unexpected Error Occured',
                        error
                    });
                })
            }
    }

    static register(req, res) {
        const { name, email, password } = req.body;

        db.query('SELECT * FROM users WHERE email=$1', [email])
            .then((result) => {
                if(result.rowCount >= 1) {
                    res.status(400).json({
                        status: 'error',
                        message: 'Email is already registered',
                    });
                } else {
                    const ecryptedPassword = bcrypt.hashSync(password, 8);
                    const uid = uuidv1();

                    const userData = [uid, name, email, ecryptedPassword, 'avatar.png', new Date().toISOString()];
                    const query = 'INSERT INTO users(id, name, email, password, photo, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
                    
                    db.query(query, userData)
                        .then((result) => {
                            res.status(201).json({
                                status: 'success',
                                message: 'User account successfully Created',
                                data: {
                                    id: result.rows[0].id,
                                    name: result.rows[0].name,
                                    email: result.rows[0].email,
                                    phone_number: result.rows[0].phone_number,
                                    photo: result.rows[0].photo,
                                    created_at: result.rows[0].created_at,
                                },
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                status: 'error',
                                message: 'User account creation failed.',
                                error: err,
                            })
                        })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 'error',
                    message: 'Error Occured',
                    error,
                });
            })
    }

}

module.exports = Auth;