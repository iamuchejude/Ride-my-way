'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RideOffers = require('../models/rideOffersModel');
var RideRequests = require('../models/rideRequestsModel');

module.exports = function () {
  function Rides() {
    _classCallCheck(this, Rides);
  }

  _createClass(Rides, null, [{
    key: 'getAllRideOffers',
    value: function getAllRideOffers(req, res) {
      if (RideOffers.getOffers().length >= 1) {
        res.status(200).json({
          status: 'success',
          message: 'Available ride offers',
          data: RideOffers.getOffers()
        });
      }

      res.status(404).json({
        status: 'error',
        message: 'No Ride Offer available'
      });
    }
  }, {
    key: 'getOneRideOffer',
    value: function getOneRideOffer(req, res) {
      var rideOffer = RideOffers.getOneOffer(parseInt(req.params.id, 10));

      if (rideOffer === false) {
        res.status(400).json({
          status: 'error',
          message: 'Ride not found'
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Ride found',
          data: rideOffer
        });
      }
    }
  }, {
    key: 'createRideOffer',
    value: function createRideOffer(req, res) {
      var _req$body = req.body,
          userId = _req$body.userId,
          startLocation = _req$body.startLocation,
          destination = _req$body.destination,
          price = _req$body.price,
          seat = _req$body.seat,
          departureDate = _req$body.departureDate,
          departureTime = _req$body.departureTime;


      var data = {
        id: RideOffers.getOffers().length + 1,
        userId: userId,
        startLocation: startLocation,
        destination: destination,
        price: price,
        seat: seat,
        departureDate: departureDate,
        departureTime: departureTime,
        createdAt: new Date().toISOString()
      };

      RideOffers.createOffer(data);
      res.status(200).json({
        status: 'success',
        message: 'Ride offer was added successfully',
        data: data
      });
    }
  }, {
    key: 'createRideOfferRequest',
    value: function createRideOfferRequest(req, res) {
      // Check if Ride Offer is existing
      var ride = RideOffers.getOneOffer(parseInt(req.params.id, 10));
      if (ride === false) {
        res.status(400).json({
          status: 'error',
          message: 'Bad Request - ID was not found'
        });
      }

      var userId = req.body.userId;


      var data = {
        id: RideRequests.getOfferRequests().length + 1,
        rideId: parseInt(req.params.id, 10),
        userId: userId,
        createdAt: new Date().toISOString()
      };
      RideRequests.createOfferRequest(data);
      res.status(200).json({
        status: 'success',
        message: 'Ride request was created successfully',
        data: data
      });
    }
  }]);

  return Rides;
}();