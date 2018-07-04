// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';

// chai.use(chaiHttp);

// describe('Test for user endpoints for Ride-my-way ride API', () => {
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTU4ZTY3NjAtN2ViMy0xMWU4LTgyZTEtMDVmMzhiZGEwNTk2IiwiaXNBdXRoIjp0cnVlfSwiaWF0IjoxNTMwNjE3MjcyLCJleHAiOjE1MzA2ODkyNzJ9.NLnv-TZZlkA3UZNwzJrKrUaO6yg4i0tCS75LACcPJjQ';

//   describe('GET all users', () => {
//     it('should return an array of all users', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com/api/v1')
//         .get('/users')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//             expect(err).to.equal(null);
//             expect(res.status).to.equal(200);
//             expect(res.body.status).to.equal('success');
//             expect(res.body.data).to.be.an('array');
//             done();
//         });
//     });
//   });

//   describe('GET one user', () => {
//     it('should return an object of one user', (done) => {
//       chai
//         .request('https://ride-my-way-andela.herokuapp.com')
//         .get('/users/eb06c140-7c4b-11e8-90e9-33c3db5d7ffc')
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//             expect(err).to.equal(null);
//             expect(res.status).to.equal(200);
//             expect(res.body.status).to.equal('success');
//             expect(res.body.data).to.be.an('object');
//             done();
//         });
//     });
//   });
// }); 
"use strict";