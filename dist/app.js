'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _rides = require('./routes/rides');

var _rides2 = _interopRequireDefault(_rides);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;

app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/assets', _express2.default.static(_path2.default.resolve(__dirname, '../docs')));

app.all('/api/v1', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Ride My Way API'
  });
});
app.use('/api/v1/rides', _rides2.default);
app.use('/api/v1/auth', _auth2.default);
app.use('/api/v1/users', _users2.default);
app.get('/api/v1/docs', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, './../docs/index.html'));
});
app.all('*', function (req, res) {
  res.status(404).json({
    status: 'error',
    message: 'Not found'
  });
});

app.listen(port, function () {
  _fancyLog2.default.info('Listening on port ' + port);
});

exports.default = app;