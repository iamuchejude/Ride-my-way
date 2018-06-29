'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usersController = require('../controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _ridesController = require('../controllers/ridesController');

var _ridesController2 = _interopRequireDefault(_ridesController);

var _authMiddleware = require('../middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _authMiddleware2.default, _usersController2.default.getAllUsers);
router.get('/:id', _authMiddleware2.default, _usersController2.default.getOneUser);
router.post('/rides', _authMiddleware2.default, _ridesController2.default.createRideOffer);
router.get('/rides/:id/requests', _authMiddleware2.default, _ridesController2.default.getRideOfferRequestsForOneRide);
router.put('/rides/:ride_id/requests/:request_id', _authMiddleware2.default, _ridesController2.default.acceptOrRejectRequest);

exports.default = router;