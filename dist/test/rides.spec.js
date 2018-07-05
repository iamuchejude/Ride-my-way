'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _ngFaker = require('ng-faker');

var _ngFaker2 = _interopRequireDefault(_ngFaker);

var _app = require('./../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Test for ride endpoints for Ride-my-way api', function () {
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiODIzNjBiNDAtN2ZkZC0xMWU4LWI2YmQtYTE2ZjljMDc5NTEwIiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNzQ1MDA2LCJleHAiOjE1MzA5MTc4MDZ9.GPo0MYnZZZn0MleMNAK0JPs1Gfql5aCLY916zO3Y2yg';

  describe('GET all ride offers', function () {
    it('should return an array of all ride offers', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
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
      _chai2.default.request(_app2.default).get('/api/v1/rides/5c622700-7fd8-11e8-9cf1-6f3fb418fc65').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
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
      _chai2.default.request(_app2.default).post('/api/v1/users/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
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
      _chai2.default.request(_app2.default).post('/api/v1/users/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
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
      _chai2.default.request(_app2.default).post('/api/v1/rides/5c622700-7fd8-11e8-9cf1-6f3fb418fc65/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: '48d31690-7fe2-11e8-b719-a11e2b5f3704'
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
      _chai2.default.request(_app2.default).post('/api/v1/rides/5c622700-7fd8-11e8-9cf1-6f3fb418fc65/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
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
      _chai2.default.request(_app2.default).get('/api/v1/users/rides/5c622700-7fd8-11e8-9cf1-6f3fb418fc65/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        (0, _chai.expect)(res.body.message).to.equal('Available Ride requests for this ride offer');
        done();
      });
    });
  });

  describe('PUT accept or reject ride offer request', function () {
    it('should return success', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/rides/26515470-7fe6-11e8-b31d-a5235d950b65').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.message).to.equal('Ride offer was deleted successfully');
        done();
      });
    });
  });

  describe('DELETE a ride offer', function () {
    it('should return success if delete was successfull', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/rides/26515470-7fe6-11e8-b31d-a5235d950b65').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.message).to.equal('Ride offer was deleted successfully');
        done();
      });
    });
  });
});