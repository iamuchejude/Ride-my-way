const ngfaker = require('ng-faker');

const ridesOffers = [];

for (let i = 1; i <= 5; i += 1) {
  ridesOffers.push({
    id: i,
    userId: i + 2,
    startPoint: ngfaker.address.localGovernment('lagos'),
    destination: ngfaker.address.localGovernment('lagos'),
    price: ngfaker.random.number({ min: 500, max: 7000 }),
    seat: ngfaker.random.number({ min: 1, max: 6 }),
    departureDate: '24th June, 2018',
    departureTime: '05:34:00AM',
    createdAt: new Date().toISOString(),
  });
}

module.exports = ridesOffers;
export { ridesOffers as default };
