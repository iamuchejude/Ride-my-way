import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Test for auth endpoints for Ride-my-way ride API', () => {

  describe('POST create new user', () => {
    it('should return a object with success and an object of created resources', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: 'Victor Basil',
            email: 'v.basil@gmail.com',
            password: 'victorsPassword',
        })
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
});