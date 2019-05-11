import pg, { Pool } from 'pg';
import env from 'dotenv';

pg.defaults.ssl = true;

env.config();

const config = {};

switch (process.env.NODE_ENV) {
  case 'test':
    config.user = process.env.TEST_DATABASE_USER;
    config.host = process.env.TEST_DATABASE_HOST;
    config.database = process.env.TEST_DATABASE_NAME;
    config.password = process.env.TEST_DATABASE_PASSWORD;
    config.port = process.env.TEST_DATABASE_PORT;
    break;
  case 'production':
    config.user = process.env.PROD_DATABASE_USER;
    config.host = process.env.PROD_DATABASE_HOST;
    config.database = process.env.PROD_DATABASE_NAME;
    config.password = process.env.PROD_DATABASE_PASSWORD;
    config.port = process.env.PROD_DATABASE_PORT;
    break;
  case 'development':
    config.user = process.env.DEV_DATABASE_USER;
    config.host = process.env.DEV_DATABASE_HOST;
    config.database = process.env.DEV_DATABASE_NAME;
    config.password = process.env.DEV_DATABASE_PASSWORD;
    config.port = process.env.DEV_DATABASE_PORT;
    break;
  default:
    throw new Error('Please specify development environment in .env file');
}

const db = new Pool(config);

module.exports = db;
