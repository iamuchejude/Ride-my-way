'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                        message: 'Returning all users',
                        data: result.rows
                    });
                }
            }).catch(function (error) {
                res.status(400).json({
                    status: 'error',
                    message: 'Error Occured',
                    error: error
                });
            });
        }
    }, {
        key: 'getOneUser',
        value: function getOneUser(req, res) {
            _connection2.default.query('SELECT * FROM users WHERE id=$1', [req.params.id]).then(function (result) {
                if (result.rowCount < 1) {
                    res.status(404).json({
                        status: 'error'
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: 'Returning user',
                        data: result.rows
                    });
                }
            }).catch(function (error) {
                res.status(400).json({
                    status: 'error',
                    message: 'Error Occured',
                    error: error
                });
            });
        }
    }]);

    return Users;
}();

exports.default = Users;