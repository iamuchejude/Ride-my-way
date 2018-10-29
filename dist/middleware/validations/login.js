'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate_email = require('./../../util/validate_email');

var _validate_email2 = _interopRequireDefault(_validate_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate(req, res, next) {
  if (!req.body.email || req.body.email === null || req.body.email === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid Email'
    });
  }

  if (!req.body.password || req.body.password === null || req.body.password === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide password'
    });
  }

  if (!(0, _validate_email2.default)(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email address'
    });
  }

  next();
};

exports.default = validate;