'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _rides = require('../controllers/rides');

var _rides2 = _interopRequireDefault(_rides);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _auth2.default, _rides2.default.getAllRideOffers);
router.get('/:id', _auth2.default, _rides2.default.getOneRideOffer);
router.delete('/:id', _auth2.default, _rides2.default.deleteOneRideOffer);
router.post('/:id/requests', _auth2.default, _rides2.default.createRideOfferRequest);

exports.default = router;