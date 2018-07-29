const pg = require('pg');
const env = require('dotenv');

env.config();

let config;

if (process.env.NODE_ENV === 'Test') {
  config = {
    user: process.env.TEST_DATABASE_USER,
    host: process.env.TEST_DATABASE_HOST,
    database: process.env.TEST_DATABASE_NAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    port: process.env.TEST_DATABASE_PORT,
  };
} else if (process.env.NODE_ENV === 'Production') {
  config = {
    user: process.env.PROD_DATABASE_USER,
    host: process.env.PROD_DATABASE_HOST,
    database: process.env.PROD_DATABASE_NAME,
    password: process.env.PROD_DATABASE_PASSWORD,
    port: process.env.PROD_DATABASE_PORT,
  };
} else if (process.env.NODE_ENV === 'Development') {
  config = {
    user: process.env.DEV_DATABASE_USER,
    host: process.env.DEV_DATABASE_HOST,
    database: process.env.DEV_DATABASE_NAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    port: process.env.DEV_DATABASE_PORT,
  };
} else {
  console.log('Please specify development environment in .env file');
}

const db = new pg.Pool(config);

module.exports = db;
