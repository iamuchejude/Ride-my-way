const db = require('./connection.js');

const RideOffers = {
    getOffers: () => {
        db.query('SELECT * FROM ride_offers WHERE id=$1', ['042ffd34-d989-321c-ad06-f60826172424'], (err, result) => {
          console.log(result.rows);
        });
    }
}

RideOffers.getOffers();