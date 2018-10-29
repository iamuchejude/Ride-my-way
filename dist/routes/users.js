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

var _create_ride = require('../middleware/validations/create_ride');

var _create_ride2 = _interopRequireDefault(_create_ride);

var _request_response = require('../middleware/validations/request_response');

var _request_response2 = _interopRequireDefault(_request_response);

var _update_password = require('../middleware/validations/update_password');

var _update_password2 = _interopRequireDefault(_update_password);

var _update_photo = require('../middleware/validations/update_photo');

var _update_photo2 = _interopRequireDefault(_update_photo);

var _update_profile = require('../middleware/validations/update_profile');

var _update_profile2 = _interopRequireDefault(_update_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _auth2.default, _users2.default.getAllUsers);
router.get('/:id', _auth2.default, _users2.default.getOneUser);
router.put('/:id/profile', _auth2.default, _update_profile2.default, _users2.default.updateUserProfile);
router.put('/:id/password', _auth2.default, _update_password2.default, _users2.default.updateUserPassword);
router.put('/:id/photo', _auth2.default, _update_photo2.default, _users2.default.updateUserPhoto);
router.post('/rides', _auth2.default, _create_ride2.default, _rides2.default.createRideOffer);
router.get('/rides/:id/requests', _auth2.default, _rides2.default.getRideOfferRequestsForOneRide);
router.put('/rides/:rideId/requests/:requestId', _auth2.default, _request_response2.default, _rides2.default.respondToRideOfferRequest);

exports.default = router;