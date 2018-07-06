import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';

chai.use(chaiHttp);

describe('Test for user endpoints for Ride-my-way ride API', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDU3NGVhNDAtODA0Yy0xMWU4LWI0OGUtMzdjNTcxNjNiNjJkIiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNzk5MjkzLCJleHAiOjE1MzA5NzIwOTN9.b8e1KpHnhLqFVfOKrqHyw3Ww1EHlhFsCTdQdOvFz-00';

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
        .get('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d')
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

  describe('UPDATE update user profile', () => {
    it('should return an success with object of updated resources', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Tolu mide',
          phoneNumber: '8135642400'
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('UPDATE update user password', () => {
    it('should return success', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/password')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'changeMyPassword'
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });

  describe('UPDATE update user photo', () => {
    it('should return success', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/photo')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          photo: 'https://avatars1.githubusercontent.com/u/38435631?s=460&v=4ss'
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });

  describe('UPDATE update email', () => {
    it('should return error because email cannot edited', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Tolu mide',
          phoneNumber: '8135642400',
          email: 'test@gmail.com'
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('error');
          done();
        });
    });
  });

  describe('UPDATE update profile with empty data', () => {
    it('should return error', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '  ',
          phoneNumber: '8135642400',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('error');
          done();
        });
    });
  });

  describe('UPDATE update password with empty data', () => {
    it('should return error', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/password')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: '  '
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('error');
          done();
        });
    });
  });

  describe('UPDATE update photo with empty data', () => {
    it('should update photo to avatar.png which is the default photo and return object of updated resources', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/4574ea40-804c-11e8-b48e-37c57163b62d/photo')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: '  '
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data.photo).to.equal('avatar.png')
          done();
        });
    });
  });

}); 
