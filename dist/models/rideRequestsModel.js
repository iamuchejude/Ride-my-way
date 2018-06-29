'use strict';

var _ngFaker = require('ng-faker');

var _ngFaker2 = _interopRequireDefault(_ngFaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rideOfferRequests = [];

for (var i = 1; i <= 8; i += 1) {
  rideOfferRequests.push({
    id: i,
    rideId: _ngFaker2.default.random.number({ min: 1, max: 5 }),
    userId: _ngFaker2.default.random.number({ min: 1, max: 10 }),
    createdAt: new Date().toISOString()
  });
}

var RideOfferRequests = {

  getOfferRequests: function getOfferRequests() {
    return rideOfferRequests;
  },

  getOneOfferRequest: function getOneOfferRequest(rideId) {
    for (var _i = 0; _i < rideOfferRequests.length; _i += 1) {
      if (rideOfferRequests[_i].rideId === rideId) {
        return rideOfferRequests[_i];
      }
    }
    return false;
  },

  createOfferRequest: function createOfferRequest(data) {
    return rideOfferRequests.push(data);
  }
};

module.exports = RideOfferRequests;