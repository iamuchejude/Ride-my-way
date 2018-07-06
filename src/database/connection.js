const pg = require('pg');
const env = require('dotenv');

env.config();

let config

if(process.env.NODE_ENV === 'test') {
    config = {
        user: 'postgres',
        host: 'localhost',
        database: 'ride_my_way_andela_test',
        password: '',
        port: 5432,
    };
    // config = {
    //     user: process.env.DATABASE_USER_TEST,
    //     host: process.env.DATABASE_HOST_TEST,
    //     database: process.env.DATABASE_NAME_TEST,
    //     password: process.env.DATABASE_PASSWORD_TEST,
    //     port: process.env.DATABASE_PORT_TEST,
    // };
} else {
    config = new pg.Pool({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
    });
}

const db = new pg.Pool(config);

module.exports = db;
