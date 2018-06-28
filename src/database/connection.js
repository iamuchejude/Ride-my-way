const pg = require('pg');
const env = require('dotenv');

env.config();

const db = new pg.Pool({
    user: 'user',
    host: process.env.DATABASE_HOST,
    database: 'ride@my.way@db',
    password: 1234,
    port: process.env.DATABASE_PORT,
});

module.exports = db;
