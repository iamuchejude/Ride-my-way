import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Test for ride endpoints for Ride-my-way api', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MDdkYjAtN2I4Mi0xMWU4LWFiYWYtMzNkZDQwODJlZWI2IiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwMjc2MzU3LCJleHAiOjE1MzAzNDgzNTd9.dRUzgOUxUbN_K_Hmsrk6XjfHHSrGpCFWFcG6c6aWtJU';

  describe('GET all ride offers', () => {
    it('should return an array of all ride offers', (done) => {
      chai
        .request(app)
        .get('/rides')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET one ride offer', () => {
    it('should return an object of a ride offer', (done) => {
      chai
        .request(app)
        .get('/rides/042ffd00-d989-321c-ad06-f69026172424')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('POST ride offer', () => {
    it('should respond with success in an object also containing created resource', (done) => {
      chai
        .request(app)
        .post('/users/rides')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '742ffd79-d989-321c-ad06-f60826172434',
          startFrom: 'Ayobo',
          destination: 'Ilupeju',
          price: 2000,
          seat: 4,
          departureDate: '25th June, 2018',
          departureTime: '06:00:00AM',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.equal('Ride offer was added successfully');
          done();
        });
    });
  });

  describe('POST ride offer request', () => {
    it('should respond with success in an object also containing created resource', (done) => {
      chai
        .request(app)
        .post('/rides/042ffd00-d989-321c-ad06-f69026172424/requests')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '742ffd34-d989-321c-ad06-f60826172424',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.equal('Ride offer request was created successfully');
          done();
        });
    });
  });
  
  describe('GET all requests for one ride offer', () => {
    it('should respond with success in an object also containing an array of all requests for ride offer', (done) => {
      chai
        .request(app)
        .get('/users/rides/042ffd34-d989-321c-ad06-f60826172424/requests')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body.message).to.equal('Available Ride requests for this ride offer');
          done();
        });
    });
  });

  describe('PUT accept or reject a ride offer', () => {
    it('should respond with error in an object', (done) => {
      chai
        .request(app)
        .put('/users/rides/042ffd34-d989-321c-ad06-f60826172424/requests/0d744880-7b1e-11e8-8139-c594ea08e5ad')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 1,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You don\'t have permission to accept or reject this ride');
          done();
        });
    });
  });
});