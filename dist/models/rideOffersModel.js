'use strict';

var db = require('../database/connection.js');

var RideOffers = {

  getOffers: function getOffers() {
    db.query('SELECT * FROM ride_offers', function (err, res) {
      console.log(err, res);
      db.end();
    });
  },

  getOneOffer: function getOneOffer(rideId) {
    for (var i = 0; i < rideOffers.length; i += 1) {
      if (rideOffers[i].id === rideId) {
        return rideOffers[i];
      }
    }
    return false;
  },

  createOffer: function createOffer(data) {
    return rideOffers.push(data);
  }
};

RideOffers.getOffers();