'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _login = require('./../middleware/validations/login');

var _login2 = _interopRequireDefault(_login);

var _register = require('./../middleware/validations/register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', _login2.default, _auth2.default.login);
router.post('/register', _register2.default, _auth2.default.register);

exports.default = router;