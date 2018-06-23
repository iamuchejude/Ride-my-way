import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';

chai.use(chaiHttp);

describe('Test for Ride-my-way api', () => {
  describe('GET all ride offers', () => {
    it('should return an array of all ride offers', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides')
        .set('Accept', 'application/json')
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
        .request(server)
        .get('/api/v1/rides/2')
        .set('Accept', 'application/json')
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
        .request(server)
        .post('/api/v1/rides')
        .send({
          userId: 5,
          startLocation: 'Ayobo',
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
        .request(server)
        .post('/api/v1/rides/3/requests')
        .send({
          userId: 6,
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

  describe('GET unavailable Ride offer', () => {
    it('should respond with error', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/0')
        .send({})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.equal('Ride offer was not found');
          done();
        });
    });

    describe('POST make request to ride offers that don\'t exist'), () => {
    it('should respond with error', (done) => {
      chai
        .request(server)
        .poss('/api/v1/rides/0/requests')
        .send({})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.equal('Cannot make request for unexisting rides');
          done();
        });
    });
  });
});