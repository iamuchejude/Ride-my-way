'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _rides = require('../controllers/rides');

var _rides2 = _interopRequireDefault(_rides);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _auth2.default, _users2.default.getAllUsers);
router.get('/:id', _auth2.default, _users2.default.getOneUser);
router.put('/:id/:data?', _auth2.default, _users2.default.updateOneUser);
router.post('/rides', _auth2.default, _rides2.default.createRideOffer);
router.get('/rides/:id/requests', _auth2.default, _rides2.default.getRideOfferRequestsForOneRide);
router.put('/rides/:ride_id/requests/:request_id', _auth2.default, _rides2.default.acceptOrRejectRequest);

exports.default = router;