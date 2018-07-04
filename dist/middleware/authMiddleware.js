'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

module.exports = function (req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET_TOKEN, function (error, decoded) {
        if (error) {
            res.status(401).json({
                status: 'error',
                message: 'Login failed!'
            });
        } else {
            req.authData = decoded;
            next();
        }
    });
};