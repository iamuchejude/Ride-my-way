'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

module.exports = function (req, res, next) {
  var authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(400).json({
      status: 'error',
      message: 'Authentication failed! Please login and try again',
      err: 'error1'
    });
  }

  var token = authorization.split(' ')[1].trim();

  _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET_TOKEN, function (error, decoded) {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed! Please login again to continue',
        error: error
      });
    }
    req.authData = decoded;
    next();
  });
};