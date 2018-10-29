'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pg2.default.defaults.ssl = true;

_dotenv2.default.config();

var config = {};

switch (process.env.NODE_ENV) {
  case 'Test':
    config.user = process.env.TEST_DATABASE_USER;
    config.host = process.env.TEST_DATABASE_HOST;
    config.database = process.env.TEST_DATABASE_NAME;
    config.password = process.env.TEST_DATABASE_PASSWORD;
    config.port = process.env.TEST_DATABASE_PORT;
    break;
  case 'Production':
    config.user = process.env.PROD_DATABASE_USER;
    config.host = process.env.PROD_DATABASE_HOST;
    config.database = process.env.PROD_DATABASE_NAME;
    config.password = process.env.PROD_DATABASE_PASSWORD;
    config.port = process.env.PROD_DATABASE_PORT;
    break;
  case 'Development':
    config.user = process.env.DEV_DATABASE_USER;
    config.host = process.env.DEV_DATABASE_HOST;
    config.database = process.env.DEV_DATABASE_NAME;
    config.password = process.env.DEV_DATABASE_PASSWORD;
    config.port = process.env.DEV_DATABASE_PORT;
    break;
  default:
    throw new Error('Please specify development environment in .env file');
}

var db = new _pg.Pool(config);

module.exports = db;