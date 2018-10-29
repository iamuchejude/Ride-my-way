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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      _connection2.default.query('SELECT id, name, email, phone_number, photo, updated_at, created_at FROM users').then(function (firstResult) {
        res.status(200).json({
          status: 'success',
          message: firstResult.rowCount + ' user(s) found',
          users: firstResult.rows
        });
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'getOneUser',
    value: function getOneUser(req, res) {
      _connection2.default.query('SELECT id, name, email, phone_number, photo, updated_at, created_at FROM users WHERE id=$1', [req.params.id]).then(function (firstResult) {
        if (firstResult.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'User was not found'
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'User found',
            user: firstResult.rows[0]
          });
        }
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'updateUserProfile',
    value: function updateUserProfile(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          phoneNumber = _req$body.phoneNumber;

      _connection2.default.query('SELECT * FROM users WHERE id=$1', [req.params.id]).then(function (resultOne) {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'User was not found'
          });
        } else {
          if (req.params.id !== req.authData.user.id) {
            res.status(401).json({
              status: 'success',
              message: 'You cannot update another user\'s profile'
            });
          } else {
            var updateQuery = 'UPDATE users SET updated_at=$1,';
            updateQuery += name !== undefined ? ' name=$2' : '';
            updateQuery += phoneNumber !== undefined ? name !== undefined ? ', phone_number=$3' : ' phone_number=$2' : '';
            updateQuery += name !== undefined && phoneNumber !== undefined ? ' WHERE id=$4' : ' WHERE id=$3';
            updateQuery += ' RETURNING updated_at,';
            updateQuery += name !== undefined && phoneNumber !== undefined ? ' name, phone_number' : name !== undefined ? ' name' : phoneNumber !== undefined ? ' phone_number' : '';

            var updateData = name !== undefined && phoneNumber !== undefined ? [name, phoneNumber] : name !== undefined ? [name] : phoneNumber !== undefined ? [phoneNumber] : '';

            _connection2.default.query(updateQuery, [new Date().toISOString()].concat(_toConsumableArray(updateData), [req.authData.user.id])).then(function (resultTwo) {
              res.status(200).json({
                status: 'succes',
                message: 'Profile updated successfully',
                user: resultTwo.rows[0]
              });
            }).catch(function () {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later'
              });
            });
          }
        }
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'updateUserPassword',
    value: function updateUserPassword(req, res) {
      var password = req.body.password;

      _connection2.default.query('SELECT * FROM users WHERE id=$1', [req.params.id]).then(function (resultOne) {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'User was not found'
          });
        } else {
          if (req.params.id !== req.authData.user.id) {
            res.status(401).json({
              status: 'success',
              message: 'You cannot update another user\'s profile'
            });
          } else {
            _connection2.default.query('UPDATE users SET password=$1, updated_at=$2 WHERE id=$3', [_bcrypt2.default.hashSync(password, 8), new Date().toISOString(), req.params.id]).then(function () {
              res.status(200).json({
                status: 'success',
                message: 'Password updated successfully'
              });
            }).catch(function () {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later'
              });
            });
          }
        }
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'updateUserPhoto',
    value: function updateUserPhoto(req, res) {
      var photo = req.body.photo;

      _connection2.default.query('SELECT * FROM users WHERE id=$1', [req.params.id]).then(function (resultOne) {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'User was not found'
          });
        } else {
          if (req.params.id !== req.authData.user.id) {
            res.status(401).json({
              status: 'success',
              message: 'You cannot update another user\'s profile'
            });
          } else {
            _connection2.default.query('UPDATE users SET photo=$1, updated_at=$2 WHERE id=$3 RETURNING photo', [photo, new Date().toISOString(), req.authData.user.id]).then(function (resultTwo) {
              res.status(200).json({
                status: 'success',
                message: 'Profile photo updated successfully!',
                user: resultTwo.rows[0]
              });
            }).catch(function () {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later'
              });
            });
          }
        }
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }]);

  return Users;
}();

exports.default = Users;