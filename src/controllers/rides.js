import randomstring from 'randomstring';
import env from 'dotenv';
import db from '../database/connection';

env.config();

class Rides {
  static getAllRideOffers(req, res) {
    db.query('SELECT * FROM ride_offers')
      .then((result) => {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'No Ride Offer Available',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning all available ride offers',
            rides: result.rows,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static getOneRideOffer(req, res) {
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride was not found',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning ride offer',
            ride: result.rows[0],
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static createRideOffer(req, res) {
    const {
      userId, startFrom, destination, seat, departureDate, departureTime,
    } = req.body;
    const query = 'INSERT INTO ride_offers(id, user_id, start_from, destination, price, seat, departure_date, departure_time, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const data = [
      randomstring.generate(10),
      userId,
      startFrom,
      destination,
      seat,
      departureDate,
      departureTime,
      new Date().toISOString(),
      new Date().toISOString(),
    ];

    db.query(query, data)
      .then((result) => {
        res.status(201).json({
          status: 'success',
          message: 'Ride offer was added successfully',
          ride: result.rows[0],
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static deleteOneRideOffer(req, res) {
    const user_id = req.authData.user.id;

    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if (user_id !== result.rows[0].user_id) {
          res.status(403).json({
            status: 'error',
            message: 'You don\'t have permission to delete this ride offer',
          });
        } else {
          db.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id])
            .then((result) => {
              if (result.rowCount < 1) {
                res.status(200).json({
                  status: 'error',
                  message: 'Ride offer could not be deleted',
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  message: 'Ride offer was deleted successfully',
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }


  static createRideOfferRequest(req, res) {
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride offer does not exist',
          });
        } else {
          const data = [
            randomstring.generate(10),
            req.params.id,
            req.authData.user.id,
            'pending',
            new Date().toISOString(),
            new Date().toISOString(),
          ];

          db.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, status, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', data)
            .then((result) => {
              res.status(201).json({
                status: 'success',
                message: 'Request was successfully made',
                request: result.rows[0],
              });
            })
            .catch((error) => {
              res.status(500).json({
                status: 'error',
                error,
                message: 'Internal server error. Please try again later',
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          error,
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static getRideOfferRequestsForOneRide(req, res) {
    // Check if Ride Offer is existing
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride does not exist.',
          });
        } else {
          db.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id])
            .then((result) => {
              if (result.rowCount < 1) {
                res.status(404).json({
                  status: 'error',
                  message: 'No request for this ride',
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  message: 'Available Ride requests for this ride offer',
                  requests: result.rows,
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static acceptOrRejectRequest(req, res) {
    const { status } = req.body;
    let ride_offer;
    let ride_requests;

    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.ride_id])
      .then((result) => {
        if (result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist',
          });
        } else {
          ride_offer = result.rows[0];
          db.query('SELECT * FROM ride_offer_requests WHERE id=$1', [req.params.request_id])
            .then((result) => {
              if (result.rowCount < 1) {
                res.status(404).json({
                  status: 'error',
                  message: 'Request does not exist',
                });
              } else {
                ride_requests = result.rows[0];
                if (ride_offer.user_id !== req.authData.user.id) {
                  res.status(403).json({
                    status: 'error',
                    message: 'You don\'t have permission to accept or reject this ride',
                  });
                } else if (status === 'accepted') {
                  db.query('SELECT seat FROM ride_offers WHERE id=$1', [req.params.ride_id])
                    .then((sres) => {
                      if (parseInt(sres.rows[0].seat, 10) < 1) {
                        res.status(400).json({
                          status: 'error',
                          message: 'No seats available! You can no longer accept ride offers',
                        });
                      }
                    })
                    .catch((errE) => {
                      res.status(500).json({
                        status: 'error',
                        message: 'Internal server error. Please try again later',
                      });
                    });
                } else {
                  db.query('UPDATE ride_offer_requests SET status=$1, updated_at=$2 WHERE id=$3 RETURNING *', [status, new Date().toISOString(), req.params.request_id])
                    .then((result) => {
                      if (status === 'accepted') {
                        db.query('UPDATE ride_offers SET seat=seat-1 WHERE id=$1 RETURNING *', [req.params.ride_id])
                          .then((ures) => {
                            res.status(200).json({
                              status: 'success',
                              message: `Request has been ${status}`,
                              request: ures.rows[0],
                            });
                          })
                          .catch((errU) => {
                            res.status(500).json({
                              status: 'error',
                              message: 'Internal server error. Please try again later',
                            });
                          });
                      } else {
                        res.status(200).json({
                          status: 'success',
                          message: `Request has been ${status}`,
                          request: result.rows[0],
                        });
                      }
                    })
                    .catch((error) => {
                      res.status(500).json({
                        status: 'error',
                        message: 'Internal server error. Please try again later',
                      });
                    });
                }
              }
            })
            .catch((errorNow) => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }
}

module.exports = Rides;
