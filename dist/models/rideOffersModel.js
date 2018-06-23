'use strict';

var _ngFaker = require('ng-faker');

var _ngFaker2 = _interopRequireDefault(_ngFaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rideOffers = [];

for (var i = 1; i <= 5; i += 1) {
  rideOffers.push({
    id: i,
    userId: _ngFaker2.default.random.number({ min: 1, max: 10 }),
    startLocation: _ngFaker2.default.address.localGovernment('lagos'),
    destination: _ngFaker2.default.address.localGovernment('lagos'),
    price: _ngFaker2.default.random.number({ min: 500, max: 7000 }),
    seat: _ngFaker2.default.random.number({ min: 1, max: 6 }),
    departureDate: '24th June, 2018',
    departureTime: '05:34:00AM',
    createdAt: new Date().toISOString()
  });
}

var RideOffers = {

  getOffers: function getOffers() {
    return rideOffers;
  },

  getOneOffer: function getOneOffer(rideId) {
    for (var _i = 0; _i < rideOffers.length; _i += 1) {
      if (rideOffers[_i].id === rideId) {
        return rideOffers[_i];
      }
    }
    return false;
  },

  createOffer: function createOffer(data) {
    return rideOffers.push(data);
  }
};

module.exports = RideOffers;