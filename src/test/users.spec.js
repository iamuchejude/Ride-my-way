import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Test for user endpoints for Ride-my-way ride API', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MDdkYjAtN2I4Mi0xMWU4LWFiYWYtMzNkZDQwODJlZWI2IiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwMjc2MzU3LCJleHAiOjE1MzAzNDgzNTd9.dRUzgOUxUbN_K_Hmsrk6XjfHHSrGpCFWFcG6c6aWtJU';

  describe('GET all users', () => {
    it('should return an array of all users', (done) => {
      chai
        .request(app)
        .get('/users')
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
  
  describe('GET one user', () => {
    it('should return an object of one user', (done) => {
      chai
        .request(app)
        .get('/users/742ffd79-d989-321c-ad06-f60826172434')
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
}); 