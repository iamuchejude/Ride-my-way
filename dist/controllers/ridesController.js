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
          res.status(404).json({
            status: 'success',
            message: 'No Ride Offer Available'
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning all available ride offers',
            data: result.rows
          });
        }
      }).catch(function (error) {
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
          res.status(404).json({
            status: 'error',
            message: 'Ride was not found'
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning ride offer',
            data: result.rows[0]
          });
        }
      }).catch(function (error) {
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

      console.log(req.params.id);

      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (user_id !== result.rows[0].user_id) {
          res.status(401).json({
            status: 'error',
            message: 'You don\'t have the right to delete this ride offer'
          });
        } else {
          _connection2.default.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
            if (result.rowCount < 1) {
              res.status(200).json({
                status: 'error',
                message: 'Ride offer could not be deleted'
              });
            } else {
              res.status(200).json({
                status: 'success',
                message: 'Ride offer deleted successfully'
              });
            }
          }).catch(function (error) {
            res.status(500).json({
              status: 'error',
              message: 'aInternal server error. Please try again later',
              error: error
            });
          });
        }
      }).catch(function (err) {
        res.status(500).json({
          status: 'error',
          message: 'bInternal server error. Please try again later',
          err: err
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


      var query = "INSERT INTO ride_offers(id, user_id, start_from, destination, price, seat, departure_date, departure_time, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
      var data = [(0, _v2.default)(), userId, startFrom, destination, price, seat, departureDate, departureTime, new Date().toISOString(), new Date().toISOString()];

      _connection2.default.query(query, data).then(function (result) {
        if (result.rowCount < 1) {
          res.status(409).json({
            status: 'error',
            message: 'Oops! Ride offer was not added'
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
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'createRideOfferRequest',
    value: function createRideOfferRequest(req, res) {
      // Check if Ride Offer is existing
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride offer does not exist'
          });
        } else {
          var userId = req.body.userId;

          if (userId === req.authData.user.id) {
            res.status(400).json({
              status: 'error',
              message: 'Sorry, You cannot request for your ride'
            });
          } else {
            var data = [(0, _v2.default)(), req.params.id, userId, 'pending', new Date().toISOString(), new Date().toISOString()];

            _connection2.default.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, status, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', data).then(function (result) {
              if (result.rows[0] < 1) {
                res.status(400).json({
                  status: 'error',
                  message: 'Request was successfully made',
                  data: result.rows[0]
                });
              } else {
                res.status(201).json({
                  status: 'success',
                  message: 'Request was not successfully made'
                });
              }
            }).catch(function (error) {
              res.status(500).json({
                status: 'error',
                error: error,
                message: 'Internal server error. Please try again later'
              });
            });
          }
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          error: error,
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }, {
    key: 'getRideOfferRequestsForOneRide',
    value: function getRideOfferRequestsForOneRide(req, res) {
      // Check if Ride Offer is existing
      _connection2.default.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id]).then(function (result) {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride does not exist.'
          });
        } else {
          _connection2.default.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id]).then(function (result) {
            if (result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'No request for this ride'
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
              message: 'Internal server error. Please try again later'
            });
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later'
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
              ride_requests = result.rows[0];
              if (ride_offer.user_id !== req.authData.user.id) {
                res.status(401).json({
                  status: 'error',
                  message: 'You don\'t have permission to accept or reject this ride'
                });
              } else {
                if (status === 'accepted') {
                  _connection2.default.query('SELECT seat FROM ride_offers WHERE id=$1', [req.params.ride_id]).then(function (sres) {
                    if (parseInt(sres.rows[0].seat, 10) < 1) {
                      res.status(400).json({
                        status: 'error',
                        message: 'No seats available! You can no longer accept ride offers'
                      });
                    }
                  }).catch(function (errE) {
                    res.status(500).json({
                      status: 'error',
                      message: 'Internal server error. Please try again later'
                    });
                  });
                } else {
                  _connection2.default.query('UPDATE ride_offer_requests SET status=$1, updated_at=$2 WHERE id=$3 RETURNING *', [status, new Date().toISOString(), req.params.request_id]).then(function (result) {
                    if (status === 'accepted') {
                      _connection2.default.query('UPDATE ride_offers SET seat=seat-1 WHERE id=$1 RETURNING *', [req.params.ride_id]).then(function (ures) {
                        res.status(200).json({
                          status: 'success',
                          message: 'Request has been ' + status,
                          data: ures.rows[0]
                        });
                      }).catch(function (errU) {
                        res.status(500).json({
                          status: 'error',
                          message: 'Internal server error. Please try again later'
                        });
                      });
                    } else {
                      res.status(200).json({
                        status: 'success',
                        message: 'Request has been ' + status,
                        data: result.rows[0]
                      });
                    }
                  }).catch(function (error) {
                    res.status(500).json({
                      status: 'error',
                      message: 'Internal server error. Please try again later'
                    });
                  });
                }
              }
            }
          }).catch(function (errorNow) {
            res.status(500).json({
              status: 'error',
              message: 'Internal server error. Please try again later'
            });
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'error',
          error: error,
          message: 'Internal server error. Please try again later'
        });
      });
    }
  }]);

  return Rides;
}();

module.exports = Rides;