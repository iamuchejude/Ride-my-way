'use strict';

var pg = require('pg');
var env = require('dotenv');
var log = require('fancy-log');

env.config();

var db = new pg.Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

db.on('error', function (err, client) {
    log.error('Idle client error', err.message, err.stack);
});

module.exports = db;