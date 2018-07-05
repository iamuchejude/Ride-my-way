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
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTU4ZTY3NjAtN2ViMy0xMWU4LTgyZTEtMDVmMzhiZGEwNTk2IiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNjE3MjcyLCJleHAiOjE1MzA2ODkyNzJ9.NLnv-TZZlkA3UZNwzJrKrUaO6yg4i0tCS75LACcPJjQ';

  describe('GET all ride offers', function () {
    it('should return an array of all ride offers', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com/api/v1').get('/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
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
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').get('/rides/d16f04c0-7c4d-11e8-90e9-33c3db5d7ffc').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
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
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').post('/users/rides').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: 'fdb4ca10-7c4d-11e8-90e9-33c3db5d7ffc',
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

  describe('POST ride offer request', function () {
    it('should respond with success in an object also containing created resource', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').post('/rides/0939d070-7c4d-11e8-90e9-33c3db5d7ffc/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        userId: '742ffd34-d989-321c-ad06-f60826172424'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride offer request was created successfully');
        done();
      });
    });
  });

  describe('GET all requests for one ride offer', function () {
    it('should respond with success in an object also containing an array of all requests for ride offer', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').get('/users/rides/0939d070-7c4d-11e8-90e9-33c3db5d7ffc/requests').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        (0, _chai.expect)(res.body.message).to.equal('Available Ride requests for this ride offer');
        done();
      });
    });
  });
});