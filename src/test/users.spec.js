import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';

chai.use(chaiHttp);

describe('Test for user endpoints for Ride-my-way ride API', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiODIzNjBiNDAtN2ZkZC0xMWU4LWI2YmQtYTE2ZjljMDc5NTEwIiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNzQ1MDA2LCJleHAiOjE1MzA5MTc4MDZ9.GPo0MYnZZZn0MleMNAK0JPs1Gfql5aCLY916zO3Y2yg';

  describe('GET all users', () => {
    it('should return an array of all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
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
        .get('/api/v1/users/82360b40-7fdd-11e8-b6bd-a16f9c079510')
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