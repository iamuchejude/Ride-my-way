'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function () {
    function Users() {
        _classCallCheck(this, Users);
    }

    _createClass(Users, null, [{
        key: 'getAllUsers',
        value: function getAllUsers(req, res) {
            _connection2.default.query('SELECT * FROM users').then(function (result) {
                if (result.rowCount < 1) {
                    res.status(200).json({
                        status: 'success',
                        message: 'No User found',
                        data: result.rows
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: 'Users found',
                        data: result.rows
                    });
                }
            }).catch(function (error) {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error. Please try again later'
                });
            });
        }
    }, {
        key: 'getOneUser',
        value: function getOneUser(req, res) {
            _connection2.default.query('SELECT * FROM users WHERE id=$1', [req.params.id]).then(function (result) {
                if (result.rowCount < 1) {
                    res.status(404).json({
                        status: 'error',
                        message: 'User was not found'
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: 'User was found',
                        data: result.rows[0]
                    });
                }
            }).catch(function (error) {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error. Please try again later'
                });
            });
        }
    }, {
        key: 'updateOneUser',
        value: function updateOneUser(req, res) {
            var loggedUserId = req.authData.user.id;
            var _req$params = req.params,
                id = _req$params.id,
                data = _req$params.data;


            _connection2.default.query('SELECT * FROM users WHERE id=$1', [req.params.id]).then(function (resultOne) {
                if (resultOne.rowCount < 1) {
                    res.status(404).json({
                        status: 'error',
                        message: 'User does not exist'
                    });
                } else {
                    if (id !== loggedUserId) {
                        res.status(401).json({
                            status: 'error',
                            message: 'You don\'t have permission to update this user'
                        });
                    } else {
                        if (data === undefined) {
                            var _req$body = req.body,
                                name = _req$body.name,
                                phoneNumber = _req$body.phoneNumber;

                            if (req.body.email !== undefined) {
                                res.status(409).json({
                                    status: 'error',
                                    message: 'Sorry, you cannot update email address'
                                });
                            } else {
                                if (name === undefined || name.trim().length < 1 || phoneNumber === undefined || phoneNumber.trim().length < 1) {
                                    res.status(409).json({
                                        status: 'error',
                                        message: 'All fields are required'
                                    });
                                } else {
                                    _connection2.default.query('UPDATE users SET name=$1, phone_number=$2 WHERE id=$3 RETURNING *', [name, phoneNumber, req.params.id]).then(function (resultTwo) {
                                        if (resultTwo.rowCount < 1) {
                                            res.status(409).json({
                                                status: 'error',
                                                message: 'Profile update failed. Please try again later'
                                            });
                                        } else {
                                            res.status(200).json({
                                                status: 'success',
                                                message: 'Profile updated successfully',
                                                data: resultTwo.rows[0]
                                            });
                                        }
                                    }).catch(function (erorTwo) {
                                        res.status(500).json({
                                            status: 'error',
                                            message: 'Internal server error. Please try again later'
                                        });
                                    });
                                }
                            }
                        } else {
                            if (data === 'photo') {
                                var photo = req.body.photo === undefined || req.body.photo.trim().length < 1 ? 'avatar.png' : req.body.photo;
                                _connection2.default.query('UPDATE users SET photo=$1 WHERE id=$2 RETURNING *', [photo, req.params.id]).then(function (resultThree) {
                                    if (resultThree.rowCount < 1) {
                                        res.status(409).json({
                                            status: 'error',
                                            message: 'Photo update failed. Please try again later'
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: 'success',
                                            message: 'Photo updated successfully',
                                            data: resultThree.rows[0]
                                        });
                                    }
                                }).catch(function (errorThree) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: 'Internal server error. Please try again later'
                                    });
                                });
                            } else {
                                var password = req.body.password;

                                if (password === undefined || password.trim().length < 1) {
                                    res.status(409).json({
                                        status: 'error',
                                        message: 'Password is required'
                                    });
                                } else {
                                    var hashedPassword = _bcrypt2.default.hashSync(password.trim(), 8);
                                    _connection2.default.query('UPDATE users SET password=$1 WHERE id=$2', [hashedPassword, req.params.id]).then(function (resultThree) {
                                        if (resultThree.rowCount < 1) {
                                            res.status(409).json({
                                                status: 'error',
                                                message: 'Password update failed. Please try again later'
                                            });
                                        } else {
                                            res.status(200).json({
                                                status: 'success',
                                                message: 'Password updated successfully'
                                            });
                                        }
                                    }).catch(function (errorThree) {
                                        res.status(500).json({
                                            status: 'error',
                                            message: 'Internal server error. Please try again later'
                                        });
                                    });
                                }
                            }
                        }
                    }
                }
            }).catch(function (errorOne) {
                console.log(errorOne);
                res.status(500).json({
                    status: 'error',
                    message: 'bInternal server error. Please try again later',
                    errorOne: errorOne
                });
            });
        }
    }]);

    return Users;
}();

exports.default = Users;