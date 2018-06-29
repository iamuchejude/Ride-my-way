'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Test for Ride-my-way api', function () {
  describe('GET all ride offers', function () {
    it('should return an array of all ride offers', function (done) {
      _chai2.default.request(_app2.default).get('/rides').set('Accept', 'application/json').end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        done();
      });
    });
  });

  // describe('GET one ride offer', () => {
  //   it('should return an object of a ride offer', (done) => {
  //     chai
  //       .request(app)
  //       .get('/api/v1/rides/2')
  //       .set('Accept', 'application/json')
  //       .end((err, res) => {
  //         expect(err).to.equal(null);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.data).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('POST ride offer', () => {
  //   it('should respond with success in an object also containing created resource', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/rides')
  //       .send({
  //         userId: 5,
  //         startLocation: 'Ayobo',
  //         destination: 'Ilupeju',
  //         price: 2000,
  //         seat: 4,
  //         departureDate: '25th June, 2018',
  //         departureTime: '06:00:00AM',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.equal(null);
  //         expect(res.status).to.equal(201);
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.data).to.be.an('object');
  //         expect(res.body.message).to.equal('Ride offer was added successfully');
  //         done();
  //       });
  //   });
  // });

  // describe('POST ride offer request', () => {
  //   it('should respond with success in an object also containing created resource', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/rides/3/requests')
  //       .send({
  //         userId: 6,
  //       })
  //       .end((err, res) => {
  //         expect(err).to.equal(null);
  //         expect(res.status).to.equal(201);
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.data).to.be.an('object');
  //         expect(res.body.message).to.equal('Ride offer request was created successfully');
  //         done();
  //       });
  //   });
  // });
});