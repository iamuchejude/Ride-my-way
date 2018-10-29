'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('./../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Test for user endpoints for Ride-my-way ride API', function () {
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDU3NGVhNDAtODA0Yy0xMWU4LWI0OGUtMzdjNTcxNjNiNjJkIiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNzk5MjkzLCJleHAiOjE1MzA5NzIwOTN9.b8e1KpHnhLqFVfOKrqHyw3Ww1EHlhFsCTdQdOvFz-00';

  describe('GET all users', function () {
    it('should return an array of all users', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
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
      _chai2.default.request(_app2.default).get('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        done();
      });
    });
  });

  describe('UPDATE update user profile', function () {
    it('should return an success with object of updated resources', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        name: 'Tolu mide',
        phoneNumber: '8135642400'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        done();
      });
    });
  });

  describe('UPDATE update user password', function () {
    it('should return success', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/password').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        password: 'changeMyPassword'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        done();
      });
    });
  });

  describe('UPDATE update user photo', function () {
    it('should return success', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/photo').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        photo: 'https://avatars1.githubusercontent.com/u/38435631?s=460&v=4ss'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        done();
      });
    });
  });

  describe('UPDATE update email', function () {
    it('should return error because email cannot edited', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        name: 'Tolu mide',
        phoneNumber: '8135642400',
        email: 'test@gmail.com'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body.status).to.equal('error');
        done();
      });
    });
  });

  describe('UPDATE update profile with empty data', function () {
    it('should return error', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        name: '  ',
        phoneNumber: '8135642400'
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body.status).to.equal('error');
        done();
      });
    });
  });

  describe('UPDATE update password with empty data', function () {
    it('should return error', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/password').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        password: '  '
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body.status).to.equal('error');
        done();
      });
    });
  });

  describe('UPDATE update photo with empty data', function () {
    it('should update photo to avatar.png which is the default photo and return object of updated resources', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/photo').set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send({
        password: '  '
      }).end(function (err, res) {
        (0, _chai.expect)(err).to.equal(null);
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data.photo).to.equal('avatar.png');
        done();
      });
    });
  });
});