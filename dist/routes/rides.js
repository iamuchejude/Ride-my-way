'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ridesController = require('../controllers/ridesController');

var _ridesController2 = _interopRequireDefault(_ridesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'API is ready to serve'
  });
});

router.get('/rides', _ridesController2.default.getAllRideOffers);
router.get('/rides/:id', _ridesController2.default.getOneRideOffer);
router.post('/rides', _ridesController2.default.createRideOffer);
router.post('/rides/:id/requests', _ridesController2.default.createRideOfferRequest);

exports.default = router;