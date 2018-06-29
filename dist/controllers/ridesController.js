'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var Rides = function () {
  function Rides() {
    _classCallCheck(this, Rides);
  }

  _createClass(Rides, null, [{
    key: 'getAllRideOffers',
    value: function getAllRideOffers(req, res) {
      _connection2.default.query('SELECT * FROM ride_offers').then(function (result) {
        if (result.rowCount < 1) {
          res.status(200).json({
            status: 'success',
            message: 'No Ride Offer Available',
            data: result.rows
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning all available ride offers',
            data: result.rows
          });
        }
      }).catch(function (error) {
        res.status(400).json({
          status: 'error',
          message: 'Error Occured',
          error: error
        });
      });
    }
  }, {
    key: 'getOneRideOffer',
    value: function getOneRideOffer(req, res) {
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error'
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning ride offer',
            data: result.rows[0]
          });
        }
      }).catch(function (error) {
        res.status(400).json({
          status: 'error',
          message: 'Error Occured',
          error: error
        });
      });
    }
  }, {
    key: 'createRideOffer',
    value: function createRideOffer(req, res) {
      var _req$body = req.body,
          userId = _req$body.userId,
          startFrom = _req$body.startFrom,
          destination = _req$body.destination,
          price = _req$body.price,
          seat = _req$body.seat,
          departureDate = _req$body.departureDate,
          departureTime = _req$body.departureTime;


      var query = "INSERT INTO ride_offers(id, user_id, start_from, destination, price, seat, departure_date, departure_time, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
      var data = [(0, _v2.default)(), userId, startFrom, destination, price, seat, departureDate, departureTime, new Date().toISOString()];

      _connection2.default.query(query, data).then(function (result) {
        if (result.rowCount < 1) {
          res.status(400).json({
            status: 'error',
            message: 'Ride offer was not successfully added'
          });
        } else {
          res.status(201).json({
            status: 'success',
            message: 'Ride offer was added successfully',
            data: result.rows[0]
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured',
          error: error
        });
      });
    }
  }, {
    key: 'createRideOfferRequest',
    value: function createRideOfferRequest(req, res) {
      // Check if Ride Offer is existing
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(400).json({
            status: 'error',
            message: 'Bad Request - ID was not found'
          });
        } else {
          var userId = req.body.userId;

          var data = [(0, _v2.default)(), req.params.id, userId, 0, new Date().toISOString()];

          _connection2.default.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, status, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *', data).then(function (result) {
            if (result.rows[0] < 1) {
              res.status(400).json({
                status: 'error',
                message: 'Ride offer request was not created successfully',
                data: result.rows[0]
              });
            } else {
              res.status(201).json({
                status: 'success',
                message: 'Ride offer request was created successfully',
                data: result.rows[0]
              });
            }
          }).catch(function (error) {
            res.status(500).json({
              status: 'error',
              message: 'Unexpected Error Occured',
              error: error
            });
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured'
        });
      });
    }
  }, {
    key: 'getRideOfferRequestsForOneRide',
    value: function getRideOfferRequestsForOneRide(req, res) {
      // Check if Ride Offer is existing
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(400).json({
            status: 'error',
            message: 'Bad Request - ID was not found'
          });
        } else {
          _connection2.default.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id]).then(function (result) {
            if (result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'No request for this ride',
                data: result.rows
              });
            } else {
              res.status(200).json({
                status: 'success',
                message: 'Available Ride requests for this ride offer',
                data: result.rows
              });
            }
          }).catch(function (error) {
            res.status(500).json({
              status: 'error',
              message: 'Error Occured',
              error: error
            });
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured',
          error: error
        });
      });
    }
  }, {
    key: 'acceptOrRejectRequest',
    value: function acceptOrRejectRequest(req, res) {
      var _req$body2 = req.body,
          userId = _req$body2.userId,
          status = _req$body2.status;

      var ride_offer = void 0;
      var ride_requests = void 0;

      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.ride_id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist'
          });
        } else {
          ride_offer = result.rows[0];
          _connection2.default.query('SELECT * FROM ride_offer_requests WHERE id=$1', [req.params.request_id]).then(function (result) {
            if (result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'Request does not exist'
              });
            } else {
              ride_requests = result.rows;

              if (ride_offer.user_id !== req.authData.user.id) {
                res.status(401).json({
                  status: 'error',
                  message: 'You don\'t have permission to accept or reject this ride'
                });
              } else {
                var message = void 0;
                if (status === 1) {
                  message = 'Request Accepted';
                } else if (status === 2) {
                  message = 'Request Rejected';
                }
                _connection2.default.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2 RETURNING *', [status, requestId]).then(function (result) {
                  res.status(200).json({
                    status: success,
                    message: message,
                    data: result.rows[0]
                  });
                }).catch(function (error) {
                  res.status(500).json({
                    status: 'error',
                    message: 'Unexpected Error Occured',
                    error: error
                  });
                });
              }
            }
          }).catch(function (errorNow) {
            res.status(500).json({
              status: 'error',
              message: 'Error Occured One',
              error: errorNow
            });
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured Two',
          error: error
        });
      });
    }
  }]);

  return Rides;
}();

module.exports = Rides;