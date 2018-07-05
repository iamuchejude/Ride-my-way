import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ngFaker from 'ng-faker';
import app from './../app';

chai.use(chaiHttp);

describe('Test for auth endpoints for Ride-my-way ride API', () => {
  const firstName = ngFaker.name.firstName();
  const lastName = ngFaker.name.lastName();
  const email = `${firstName}.${lastName}@gmail.com`.toLowerCase();

  const data = {
    name: `${firstName} ${lastName}`,
    email: `${email}`,
    password: `${firstName.toLowerCase()}Password`,
  }

  describe('POST create new user', () => {
    it('should return an object with success with an object of created resources', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/register')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(data)
        .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.photo).to.equal('avatar.png');
            done();
        });
    });
  });

  describe('POST log user in', () => {
    it('should return an object with success with an object containing auth token if auth is successfull', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'nuchejud@gmail.com',
          password: 'changeMyPassword',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.isAuth).to.equal(true);
          done();
        });
    });
  });
});