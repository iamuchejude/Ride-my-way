import ngfaker from 'ng-faker';

const rideOfferRequests = [];

for (let i = 1; i <= 8; i += 1) {
  rideOfferRequests.push({
    id: i,
    rideId: ngfaker.random.number({ min: 1, max: 5 }),
    userId: ngfaker.random.number({ min: 1, max: 10 }),
    createdAt: new Date().toISOString(),
  });
}

const RideOfferRequests = {

  getOfferRequests: () => rideOfferRequests,

  getOneOfferRequest: (rideId) => {
    for (let i = 0; i < rideOfferRequests.length; i += 1) {
      if (rideOfferRequests[i].rideId === rideId) {
        return rideOfferRequests[i];
      }
    }
    return false;
  },

  createOfferRequest: data => rideOfferRequests.push(data),
};

module.exports = RideOfferRequests;
