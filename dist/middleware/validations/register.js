'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate_email = require('./../../util/validate_email');

var _validate_email2 = _interopRequireDefault(_validate_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate(req, res, next) {
  if (!req.body.name || req.body.name === null || req.body.name === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide Full Names'
    });
  }

  var hasNumberAndSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9?]/;
  if (hasNumberAndSpecialCharacters.test(req.body.name)) {
    return res.status(400).json({
      status: 'error',
      message: 'Name must contain only alphabets and spaces'
    });
  } else if (req.body.name.split(' ').length < 2 || req.body.name.split(' ')[0].length < 1 || req.body.name.split(' ')[1].length < 1) {
    return res.status(400).json({
      status: 'error',
      message: 'Name must contain valid First and Last Names. Initials are not allowed.'
    });
  }

  if (!req.body.email || req.body.email === null || req.body.email === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email address'
    });
  } else if (!(0, _validate_email2.default)(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email address'
    });
  }

  if (!req.body.password || req.body.password === null || req.body.password === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide password'
    });
  }

  if (req.body.password.length < 6) {
    return res.status(400).json({
      status: 'error',
      message: 'Password is too short. Password must contain at least 6 characters'
    });
  }

  next();
};

exports.default = validate;