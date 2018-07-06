'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _ngFaker = require('ng-faker');

var _ngFaker2 = _interopRequireDefault(_ngFaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Test for ride endpoints for Ride-my-way api', function () {
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDU3NGVhNDAtODA0Yy0xMWU4LWI0OGUtMzdjNTcxNjNiNjJkIiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNzk5MjkzLCJleHAiOjE1MzA5NzIwOTN9.b8e1KpHnhLqFVfOKrqHyw3Ww1EHlhFsCTdQdOvFz-00';

  describe('GET all ride offers', function () {
    it('should return an array of all ride offers', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').get('/api/v1/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        done();
      });
    });
  });

  describe('GET one ride offer', function () {
    it('should return an object of a ride offer', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').get('/api/v1/rides/b4a73be0-805e-11e8-8b74-375385422771').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        done();
      });
    });
  });

  describe('POST ride offer', function () {
    it('should respond with success in an object also containing created resource', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').post('/api/v1/users/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: '82360b40-7fdd-11e8-b6bd-a16f9c079510',
        startFrom: _ngFaker2.default.address.localGovernment('lagos'),
        destination: _ngFaker2.default.address.localGovernment('lagos'),
        price: _ngFaker2.default.random.number({ min: 500, max: 5000 }),
        seat: _ngFaker2.default.random.number({ min: 1, max: 6 }),
        departureDate: '25th June, 2018',
        departureTime: '06:00:00AM'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride offer was added successfully');
        done();
      });
    });
  });

  describe('POST ride offer with empty data', function () {
    it('should respond with error', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').post('/api/v1/users/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: '82360b40-7fdd-11e8-b6bd-a16f9c079510',
        startFrom: '   ',
        destination: '   ',
        price: _ngFaker2.default.random.number({ min: 500, max: 5000 }),
        seat: '    ',
        departureDate: '25th June, 2018',
        departureTime: '06:00:00AM'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body.status).to.equal('error');
        done();
      });
    });
  });

  describe('POST ride offer request', function () {
    it('should respond with success in an object also containing created resource', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').post('/api/v1/rides/b4a73be0-805e-11e8-8b74-375385422771/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: '5f1314c0-805d-11e8-8b74-375385422771'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Request was successfully made');
        done();
      });
    });
  });

  describe('POST ride offer request with empty user id', function () {
    it('should respond with error', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').post('/api/v1/rides/5c622700-7fd8-11e8-9cf1-6f3fb418fc65/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: '   '
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body.status).to.equal('error');
        done();
      });
    });
  });

  describe('GET all requests for one ride offer', function () {
    it('should respond with success in an object also containing an array of all requests for ride offer', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').get('/api/v1/users/rides/b4a73be0-805e-11e8-8b74-375385422771/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        (0, _chai.expect)(res.body.message).to.equal('Available Ride requests for this ride offer');
        done();
      });
    });
  });

  // describe('PUT accept or reject ride offer request', () => {
  //   it('should return success', (done) => {
  //     chai
  //       .request('https://ride-my-way-andela.herokuapp.com')
  //       .put('/api/v1/rides/b4a73be0-805e-11e8-8b74-375385422771/requests/5df6e470-805f-11e8-8b74-375385422771')
  //       .set('Accept', 'application/json')
  //       .set('Content-Type', 'application/x-www-form-urlencoded')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send({
  //         status: 'accepted',
  //         userId: '4574ea40-804c-11e8-b48e-37c57163b62d'
  //       })
  //       .end((err, res) => {
  //         expect(err).to.equal(null);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.message).to.equal('Ride offer was deleted successfully');
  //         done();
  //       });
  //   });
  // });

  // describe('DELETE a ride offer', () => {
  //   it('should return success if delete was successfull', (done) => {
  //     chai
  //       .request('https://ride-my-way-andela.herokuapp.com')
  //       .delete('/api/v1/rides/0c288270-805f-11e8-8b74-375385422771')
  //       .set('Accept', 'application/json')
  //       .set('Content-Type', 'application/x-www-form-urlencoded')
  //       .set('Authorization', `Bearer ${token}`)
  //       .end((err, res) => {
  //         expect(err).to.equal(null);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.message).to.equal('Ride offer was deleted successfully');
  //         done();
  //       });
  //   });
  // });
});