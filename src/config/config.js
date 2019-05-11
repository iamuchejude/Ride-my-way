import env from 'dotenv';

env.config();

export default {
  development: {
    username: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    host: process.env.DEV_DATABASE_HOST,
    dialect: process.env.DEV_DATABASE_DIALECT,
  },
  test: {
    username: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: process.env.TEST_DATABASE_HOST,
    dialect: process.env.TEST_DATABASE_DIALECT,
  },
  production: {
    username: process.env.PROD_DATABASE_USER,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    host: process.env.PROD_DATABASE_HOST,
    dialect: process.env.PROD_DATABASE_DIALECT,
  }
};
