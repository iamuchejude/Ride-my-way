// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import ngFaker from 'ng-faker';

// chai.use(chaiHttp);

// describe('Test for ride endpoints for Ride-my-way api', () => {
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTU4ZTY3NjAtN2ViMy0xMWU4LTgyZTEtMDVmMzhiZGEwNTk2IiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNjE3MjcyLCJleHAiOjE1MzA2ODkyNzJ9.NLnv-TZZlkA3UZNwzJrKrUaO6yg4i0tCS75LACcPJjQ';

//   describe('GET all ride offers', () => {
//     it('should return an array of all ride offers', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com/api/v1')
//         .get('/rides')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           expect(err).to.equal(null);
//           expect(res.status).to.equal(200);
//           expect(res.body.status).to.equal('success');
//           expect(res.body.data).to.be.an('array');
//           done();
//         });
//     });
//   });

//   describe('GET one ride offer', () => {
//     it('should return an object of a ride offer', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com')
//         .get('/rides/d16f04c0-7c4d-11e8-90e9-33c3db5d7ffc')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           expect(err).to.equal(null);
//           expect(res.status).to.equal(200);
//           expect(res.body.status).to.equal('success');
//           expect(res.body.data).to.be.an('object');
//           done();
//         });
//     });
//   });

//   describe('POST ride offer', () => {
//     it('should respond with success in an object also containing created resource', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com')
//         .post('/users/rides')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           userId: 'fdb4ca10-7c4d-11e8-90e9-33c3db5d7ffc',
//           startFrom: ngFaker.address.localGovernment('lagos'),
//           destination: ngFaker.address.localGovernment('lagos'),
//           price: ngFaker.random.number({ min: 500, max: 5000 }),
//           seat: ngFaker.random.number({ min: 1, max: 6 }),
//           departureDate: '25th June, 2018',
//           departureTime: '06:00:00AM',
//         })
//         .end((err, res) => {
//           expect(err).to.equal(null);
//           expect(res.status).to.equal(201);
//           expect(res.body.status).to.equal('success');
//           expect(res.body.data).to.be.an('object');
//           expect(res.body.message).to.equal('Ride offer was added successfully');
//           done();
//         });
//     });
//   });

//   describe('POST ride offer request', () => {
//     it('should respond with success in an object also containing created resource', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com')
//         .post('/rides/0939d070-7c4d-11e8-90e9-33c3db5d7ffc/requests')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           userId: '742ffd34-d989-321c-ad06-f60826172424',
//         })
//         .end((err, res) => {
//           expect(err).to.equal(null);
//           expect(res.status).to.equal(201);
//           expect(res.body.status).to.equal('success');
//           expect(res.body.data).to.be.an('object');
//           expect(res.body.message).to.equal('Ride offer request was created successfully');
//           done();
//         });
//     });
//   });

//   describe('GET all requests for one ride offer', () => {
//     it('should respond with success in an object also containing an array of all requests for ride offer', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com')
//         .get('/users/rides/0939d070-7c4d-11e8-90e9-33c3db5d7ffc/requests')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           expect(err).to.equal(null);
//           expect(res.status).to.equal(200);
//           expect(res.body.status).to.equal('success');
//           expect(res.body.data).to.be.an('array');
//           expect(res.body.message).to.equal('Available Ride requests for this ride offer');
//           done();
//         });
//     });
//   });
// });
"use strict";