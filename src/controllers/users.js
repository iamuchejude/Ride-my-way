import bcrypt from 'bcrypt';
import db from '../database/connection';

export default class Users {
    static getAllUsers(req, res) {
        db.query('SELECT * FROM users')
            .then((result) => {
                if(result.rowCount < 1) {
                    res.status(200).json({
                        status: 'success',
                        message: 'No User found',
                        data: result.rows,
                    })
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: 'Users found',
                        data: result.rows,
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error. Please try again later',
                })
            })
    }

    static getOneUser(req, res) {
        db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
          .then((result) => {
            if(result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'User was not found'
              })
            } else {
              res.status(200).json({
                status: 'success',
                message: 'User was found',
                data: result.rows[0],
              })
            }
          })
            .catch((error) => {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error. Please try again later',
                })
          })
    }

    static updateOneUser(req, res) {
        const loggedUserId = req.authData.user.id;
        const { id, data} = req.params;

        db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
            .then((resultOne) => {
                if(resultOne.rowCount < 1) {
                    res.status(404).json({
                        status: 'error',
                        message: 'User does not exist'
                    })
                } else {
                    if(id !== loggedUserId) {
                        res.status(401).json({
                            status: 'error',
                            message: 'You don\'t have permission to update this user'
                        })
                    } else {
                        if(data === undefined) {
                            const { name, phoneNumber } = req.body;
                            if(req.body.email !== undefined) {
                                res.status(409).json({
                                    status: 'error',
                                    message: 'Sorry, you cannot update email address'
                                });
                            } else {
                                if((name === undefined || name.trim().length < 1) || (phoneNumber === undefined || phoneNumber.trim().length < 1)) {
                                    res.status(409).json({
                                        status: 'error',
                                        message: 'All fields are required'
                                    });
                                } else {
                                    db.query('UPDATE users SET name=$1, phone_number=$2 WHERE id=$3 RETURNING *', [name, phoneNumber, req.params.id])
                                        .then((resultTwo) => {
                                            if (resultTwo.rowCount < 1) {
                                                res.status(409).json({
                                                    status: 'error',
                                                    message: 'Profile update failed. Please try again later',
                                                })
                                            } else {
                                                res.status(200).json({
                                                    status: 'success',
                                                    message: 'Profile updated successfully',
                                                    data: resultTwo.rows[0]
                                                })
                                            }
                                        })
                                        .catch((erorTwo) => {
                                            res.status(500).json({
                                                status: 'error',
                                                message: 'Internal server error. Please try again later',
                                            })
                                        })
                                }
                            }
                        } else {
                            if(data === 'photo') {
                                let photo = req.body.photo === undefined || req.body.photo.trim().length < 1 ? 'avatar.png' : req.body.photo;
                                db.query('UPDATE users SET photo=$1 WHERE id=$2 RETURNING *', [photo, req.params.id])
                                    .then((resultThree) => {
                                        if (resultThree.rowCount < 1) {
                                            res.status(409).json({
                                                status: 'error',
                                                message: 'Photo update failed. Please try again later',
                                            })
                                        } else {
                                            res.status(200).json({
                                                status: 'success',
                                                message: 'Photo updated successfully',
                                                data: resultThree.rows[0]
                                            })
                                        }
                                    })
                                    .catch((errorThree) => {
                                        res.status(500).json({
                                            status: 'error',
                                            message: 'Internal server error. Please try again later',
                                        })
                                    })
                            } else {
                                const { password } = req.body;
                                if (password === undefined || password.trim().length < 1) {
                                    res.status(409).json({
                                        status: 'error',
                                        message: 'Password is required'
                                    });
                                } else {
                                    const hashedPassword = bcrypt.hashSync(password.trim(), 8);
                                    db.query('UPDATE users SET password=$1 WHERE id=$2', [hashedPassword, req.params.id])
                                        .then((resultThree) => {
                                            if (resultThree.rowCount < 1) {
                                                res.status(409).json({
                                                    status: 'error',
                                                    message: 'Password update failed. Please try again later',
                                                })
                                            } else {
                                                res.status(200).json({
                                                    status: 'success',
                                                    message: 'Password updated successfully',
                                                })
                                            }
                                        })
                                        .catch((errorThree) => {
                                            res.status(500).json({
                                                status: 'error',
                                                message: 'Internal server error. Please try again later',
                                            })
                                        })
                                }
                            }
                        }
                    }
                }
            })
            .catch((errorOne) => {
                console.log(errorOne);
                res.status(500).json({
                    status: 'error',
                    message: 'bInternal server error. Please try again later',
                    errorOne
                })
            });
    }
}