'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Test for user endpoints for Ride-my-way ride API', function () {
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTU4ZTY3NjAtN2ViMy0xMWU4LTgyZTEtMDVmMzhiZGEwNTk2IiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNjE3MjcyLCJleHAiOjE1MzA2ODkyNzJ9.NLnv-TZZlkA3UZNwzJrKrUaO6yg4i0tCS75LACcPJjQ';

  describe('GET all users', function () {
    it('should return an array of all users', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com/api/v1').get('/users').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        done();
      });
    });
  });

  describe('GET one user', function () {
    it('should return an object of one user', function (done) {
      _chai2.default.request('https://ride-my-way-andela.herokuapp.com').get('/users/eb06c140-7c4b-11e8-90e9-33c3db5d7ffc').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        done();
      });
    });
  });
});