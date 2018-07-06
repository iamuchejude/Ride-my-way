import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ngFaker from 'ng-faker';
import app from './../app';

chai.use(chaiHttp);

describe('Test for ride endpoints for Ride-my-way api', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDU3NGVhNDAtODA0Yy0xMWU4LWI0OGUtMzdjNTcxNjNiNjJkIiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNzk5MjkzLCJleHAiOjE1MzA5NzIwOTN9.b8e1KpHnhLqFVfOKrqHyw3Ww1EHlhFsCTdQdOvFz-00';

  describe('GET all ride offers', () => {
    it('should return an array of all ride offers', (done) => {
      chai
        .request(app)
        .get('/api/v1/rides')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.rides).to.be.an('array');
          done();
        });
    });
  });

  describe('GET one ride offer', () => {
    it('should return an object of a ride offer', (done) => {
      chai
        .request(app)
        .get('/api/v1/rides/b4a73be0-805e-11e8-8b74-375385422771')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.ride).to.be.an('object');
          done();
        });
    });
  });

  describe('POST ride offer', () => {
    it('should respond with success in an object also containing created resource', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/rides')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '82360b40-7fdd-11e8-b6bd-a16f9c079510',
          startFrom: ngFaker.address.localGovernment('lagos'),
          destination: ngFaker.address.localGovernment('lagos'),
          price: ngFaker.random.number({ min: 500, max: 5000 }),
          seat: ngFaker.random.number({ min: 1, max: 6 }),
          departureDate: '25th June, 2018',
          departureTime: '06:00:00AM',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.ride).to.be.an('object');
          expect(res.body.message).to.equal('Ride offer was added successfully');
          done();
        });
    });
  });

  describe('POST ride offer with empty data', () => {
    it('should respond with error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/rides')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '82360b40-7fdd-11e8-b6bd-a16f9c079510',
          startFrom: '   ',
          destination: '   ',
          price: ngFaker.random.number({ min: 500, max: 5000 }),
          seat: '    ',
          departureDate: '25th June, 2018',
          departureTime: '06:00:00AM',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('error');
          done();
        });
    });
  });

  describe('POST ride offer request', () => {
    it('should respond with success in an object also containing created resource', (done) => {
      chai
        .request(app)
        .post('/api/v1/rides/b4a73be0-805e-11e8-8b74-375385422771/requests')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '5f1314c0-805d-11e8-8b74-375385422771',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.request).to.be.an('object');
          expect(res.body.message).to.equal('Request was successfully made');
          done();
        });
    });
  });

  describe('POST ride offer request with empty user id', () => {
    it('should respond with error', (done) => {
      chai
        .request(app)
        .post('/api/v1/rides/5c622700-7fd8-11e8-9cf1-6f3fb418fc65/requests')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '   ',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('error');
          done();
        });
    });
  });
  
  describe('GET all requests for one ride offer', () => {
    it('should respond with success in an object also containing an array of all requests for ride offer', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/rides/b4a73be0-805e-11e8-8b74-375385422771/requests')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.requests).to.be.an('array');
          expect(res.body.message).to.equal('Available Ride requests for this ride offer');
          done();
        });
    });
  });
});
