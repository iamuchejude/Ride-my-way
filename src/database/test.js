const db = require('./connection.js');

db.query('SELECT * FROM ride_offers', (err, res) => {
    console.log(res.rows);
    db.end();
});