import db from '../database/connection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uuidv1 from 'uuid/v1';
import env from 'dotenv';

env.config();

class Auth {
    static login(req, res) {
        const { email, password } = req.body;
        if((email === undefined) || (password === undefined)) {
            res.status(400).json({
                status: 'error',
                message: 'Please provide an Email and a Password',
            })
        } else {
            db.query('SELECT * FROM users WHERE email=$1', [email])
                .then((result) => {
                    if(result.rowCount < 1) {
                        res.status(404).json({
                            status: 'error',
                            message: 'Login Failed! Email or Password is incorrect',
                        });
                    } else {
                        const comparePassword = bcrypt.compareSync(password, result.rows[0].password);
                        if(!comparePassword) {
                            res.status(401).json({
                                status: 'error',
                                message: 'Login Failed! Email or Password is incorrect',
                            })
                        } else {
                            let user = {
                                id: result.rows[0].id,
                                isAuth: true,
                            }
                            
                            jwt.sign({ user }, process.env.JWT_SECRET_TOKEN, { expiresIn: '48h' }, (error, token) => {
                                if(error) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: 'Login failed! Please try again later',
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'success',
                                        message: 'Login successful!',
                                        user,
                                        token,
                                    })
                                }
                            });
                        }
                    }
                })
                .catch((error) => {
                    res.status(500).json({
                        status: 'error',
                        message: 'Internal server error occured! Please try again later',
                    });
                })
            }
    }

    static register(req, res) {
        const { name, email, password } = req.body;
        if((name === undefined) || (email === undefined) || (password === undefined)) {
            res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            })
        } else {
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

                        const userData = [uid, name, email, ecryptedPassword, 'avatar.png', new Date(), new Date().toISOString()];
                        const query = 'INSERT INTO users(id, name, email, password, photo, updated_at, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                        
                        db.query(query, userData)
                            .then((result) => {
                                res.status(201).json({
                                    status: 'success',
                                    message: 'Registration successful!',
                                    user: {
                                        id: result.rows[0].id,
                                        name: result.rows[0].name,
                                        email: result.rows[0].email,
                                        phone_number: result.rows[0].phone_number,
                                        photo: result.rows[0].photo,
                                        updated_at: result.rows[0].updated_at,
                                        created_at: result.rows[0].created_at,
                                    },
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    status: 'error',
                                    message: 'Internal server error occured! Please try again later',
                                });
                            })
                    }
                })
                .catch((error) => {
                    res.status(500).json({
                        status: 'error',
                        message: 'Internal server error occured! Please try again later',
                    });
                })
        }
    }

}

module.exports = Auth;