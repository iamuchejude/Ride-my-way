'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pino = require('pino');

var _pino2 = _interopRequireDefault(_pino);

var _rides = require('./routes/rides');

var _rides2 = _interopRequireDefault(_rides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.PORT || 8080;

app.use(_bodyParser2.default.json({ type: 'application/*+json' }));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/api/v1', _rides2.default);

var server = app.listen(port, function () {
  (0, _pino2.default)().info('Listening on port ' + port);
});

exports.default = app;

exports.server = server;