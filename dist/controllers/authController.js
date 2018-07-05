'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var Auth = function () {
    function Auth() {
        _classCallCheck(this, Auth);
    }

    _createClass(Auth, null, [{
        key: 'login',
        value: function login(req, res) {
            var _req$body = req.body,
                email = _req$body.email,
                password = _req$body.password;


            if (email === null || undefined || email.trim().length < 1 || password === null || undefined || password.trim().length < 1) {
                res.status(400).json({
                    status: 'error',
                    message: 'Please provide an email and a password'
                });
            } else {
                _connection2.default.query('SELECT * FROM users WHERE email=$1', [email]).then(function (result) {
                    if (result.rowCount < 1) {
                        res.status(404).json({
                            status: 'error',
                            message: 'Login Failed! Email is not registered'
                        });
                    } else {
                        var comparePassword = _bcrypt2.default.compareSync(password, result.rows[0].password);
                        if (!comparePassword) {
                            res.status(401).json({
                                status: 'error',
                                message: 'Login Failed! Password is incorrect',
                                data: result.rows[0]
                            });
                        } else {
                            var user = {
                                id: result.rows[0].id,
                                isAuth: true
                            };

                            _jsonwebtoken2.default.sign({ user: user }, process.env.JWT_SECRET_TOKEN, { expiresIn: '48h' }, function (error, token) {
                                if (error) {
                                    res.status(500).json({
                                        status: 'error',
                                        message: 'Login failed! Please try again later',
                                        error: error
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'success',
                                        message: 'Login successful!',
                                        data: user,
                                        token: token
                                    });
                                }
                            });
                        }
                    }
                }).catch(function (error) {
                    res.status(500).json({
                        status: 'error',
                        message: 'Internal server error occured! Please try again later'
                    });
                });
            }
        }
    }, {
        key: 'register',
        value: function register(req, res) {
            var _req$body2 = req.body,
                name = _req$body2.name,
                email = _req$body2.email,
                password = _req$body2.password;


            _connection2.default.query('SELECT * FROM users WHERE email=$1', [email]).then(function (result) {
                if (result.rowCount >= 1) {
                    res.status(409).json({
                        status: 'error',
                        message: 'Email is already registered'
                    });
                } else {
                    var ecryptedPassword = _bcrypt2.default.hashSync(password, 8);
                    var uid = (0, _v2.default)();

                    var userData = [uid, name, email, ecryptedPassword, 'avatar.png', new Date(), new Date().toISOString()];
                    var query = 'INSERT INTO users(id, name, email, password, photo, updated_at, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

                    _connection2.default.query(query, userData).then(function (result) {
                        res.status(201).json({
                            status: 'success',
                            message: 'Registration successful!',
                            data: {
                                id: result.rows[0].id,
                                name: result.rows[0].name,
                                email: result.rows[0].email,
                                phone_number: result.rows[0].phone_number,
                                photo: result.rows[0].photo,
                                updated_at: result.rows[0].updated_at,
                                created_at: result.rows[0].created_at
                            }
                        });
                    }).catch(function (error) {
                        res.status(500).json({
                            status: 'error',
                            message: 'Internal server error occured! Please try again later'
                        });
                    });
                }
            }).catch(function (error) {
                res.status(500).json({
                    status: 'error',
                    message: 'Internal server error occured! Please try again later'
                });
            });
        }
    }]);

    return Auth;
}();

module.exports = Auth;