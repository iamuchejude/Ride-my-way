'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _process_date = require('../util/process_date');

var _process_date2 = _interopRequireDefault(_process_date);

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
        res.status(200).json({
          status: 'success',
          message: result.rowCount + ' ride offer(s) found',
          rides: result.rows
        });
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'getOneRideOffer',
    value: function getOneRideOffer(req, res) {
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Ride Offer found',
          ride: result.rows[0]
        });
      }).catch(function () {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'createRideOffer',
    value: function createRideOffer(req, res) {
      var _req$body = req.body,
          startLocation = _req$body.startLocation,
          destination = _req$body.destination,
          seats = _req$body.seats,
          departureDate = _req$body.departureDate,
          departureTime = _req$body.departureTime;


      var query = 'INSERT INTO ride_offers(id, user_id, start_from, destination, seat, departure_date, departure_time, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      var data = [_randomstring2.default.generate(10), req.authData.user.id, startLocation, destination, seats, (0, _process_date2.default)(departureDate), (0, _process_date2.default)(departureTime), new Date().toISOString(), new Date().toISOString()];

      _connection2.default.query(query, data).then(function (result) {
        res.status(201).json({
          status: 'success',
          message: 'Ride offer was successfully created',
          ride: result.rows[0]
        });
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'deleteOneRideOffer',
    value: function deleteOneRideOffer(req, res) {
      var user_id = req.authData.user.id;
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rows[0].user_id !== user_id) {
          res.status(403).json({
            status: 'error',
            message: 'You don\'t have permission to delete this Ride Offer'
          });
        } else {
          _connection2.default.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id]).then(function () {
            return res.status(200).json({
              status: 'success',
              message: 'Ride Offer was deleted successfully'
            });
          }).catch(function () {
            res.status(500).json({
              status: 'error',
              message: 'Internal server error. Please try again later'
            });
          });
        }
      }).catch(function (err) {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'createRideOfferRequest',
    value: function createRideOfferRequest(req, res) {
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist'
          });
        } else {
          if (result.rows[0].user_id === req.authData.user.id) {
            res.status(400).json({
              status: 'error',
              message: 'You cannot request for your Ride Offer'
            });
          } else {
            if (result.rows[0].seat < 1) {
              res.status(400).json({
                status: 'error',
                message: 'No available seat! You cannot request for this Ride Offer'
              });
            } else {
              var data = [_randomstring2.default.generate(10), req.params.id, req.authData.user.id, req.authData.user.name, 'pending', new Date().toISOString(), new Date().toISOString()];

              _connection2.default.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, user_name, status, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', data).then(function (result) {
                res.status(201).json({
                  status: 'success',
                  message: 'Request was successfully made',
                  request: result.rows[0]
                });
              }).catch(function () {
                res.status(500).json({
                  status: 'error',
                  message: 'Internal server error. Please try again later'
                });
              });
            }
          }
        }
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'getRideOfferRequestsForOneRide',
    value: function getRideOfferRequestsForOneRide(req, res) {
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (resultOne) {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist'
          });
        } else {
          if (resultOne.rows[0].user_id !== req.authData.user.id) {
            res.status(401).json({
              status: 'error',
              message: 'You can not view Requests for a Ride Offer you did not create'
            });
          } else {
            _connection2.default.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id]).then(function (result) {
              if (result.rowCount < 1) {
                res.status(404).json({
                  status: 'error',
                  message: 'No Request was found for this Ride Offer'
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  message: 'Showing ' + result.rowCount + ' Request(s) for this Ride Offer',
                  requests: result.rows
                });
              }
            }).catch(function () {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later'
              });
            });
          }
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'respondToRideOfferRequest',
    value: function respondToRideOfferRequest(req, res) {
      var status = req.body.status;


      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.rideId]).then(function (resultOne) {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist'
          });
        } else {
          _connection2.default.query('SELECT * FROM ride_offer_requests WHERE id=$1', [req.params.requestId]).then(function (resultTwo) {
            if (resultTwo.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'Ride Offer Requests does not exist'
              });
            } else {
              if (resultOne.rows[0].user_id !== req.authData.user.id) {
                res.status(403).json({
                  status: 'error',
                  message: 'You cannot accept or reject a Requests for a Ride you did not offer'
                });
              } else {
                if (resultTwo.rows[0].status !== 'pending') {
                  res.status(400).json({
                    status: 'error',
                    message: 'You cannot respond to this Ride Offer Request again'
                  });
                } else {
                  if (status === 'rejected') {
                    _connection2.default.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2', ['rejected', req.params.requestId]).then(function () {
                      res.status(200).json({
                        status: 'success',
                        message: 'Request rejected'
                      });
                    }).catch(function () {
                      res.status(500).json({
                        status: 'error',
                        message: 'Internal server error. Please try again later'
                      });
                    });
                  } else if (status === 'accepted') {
                    if (resultOne.rows[0].seat < 1) {
                      res.status(400).json({
                        status: 'error',
                        message: 'No seat available! You can no longer accept a Requests for this Ride Offer.'
                      });
                    } else {
                      _connection2.default.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2', ['accepted', req.params.requestId]).then(function () {
                        _connection2.default.query('UPDATE ride_offers SET seat=seat-1 WHERE id=$1', [req.params.rideId]).then(function () {
                          res.status(200).json({
                            status: 'success',
                            message: 'Request accepted'
                          });
                        }).catch(function () {
                          res.status(500).json({
                            status: 'error',
                            message: 'Internal server error. Please try again later'
                          });
                        });
                      }).catch(function () {
                        res.status(500).json({
                          status: 'error',
                          message: 'Internal server error. Please try again later'
                        });
                      });
                    }
                  }
                }
              }
            }
          }).catch(function () {
            res.status(500).json({
              status: 'error',
              message: 'Internal server error. Please try again later'
            });
          });
        }
      }).catch(function () {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }]);

  return Rides;
}();

module.exports = Rides;