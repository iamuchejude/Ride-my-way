const db = require('../database/connection.js');

const RideOffers = {

  getOffers: () => {
    db.query('SELECT * FROM ride_offers', (err, res) => {
      console.log(err, res);
      db.end();
    });
  },

  getOneOffer: (rideId) => {
    for (let i = 0; i < rideOffers.length; i += 1) {
      if (rideOffers[i].id === rideId) {
        return rideOffers[i];
      }
    }
    return false;
  },

  createOffer: data => rideOffers.push(data),
};

RideOffers.getOffers();
