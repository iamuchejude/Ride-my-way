import randomstring from 'randomstring';
import env from 'dotenv';
import db from '../database/connection';

env.config();

class Rides {
  static getAllRideOffers(req, res) {
    db.query('SELECT * FROM ride_offers')
      .then((result) => {
        res.status(200).json({
          status: 'success',
          message: `${result.rowCount} ride offer(s) found`,
          rides: result.rows,
        });
      })
      .catch(() => {
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
          return res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist',
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Ride Offer found',
          ride: result.rows[0],
        });
      })
      .catch(() => {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static createRideOffer(req, res) { 
    const {
      startLocation, destination, seats, departureDate, departureTime,
    } = req.body;
    const query = 'INSERT INTO ride_offers(id, user_id, start_from, destination, seat, departure_date, departure_time, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const data = [
      randomstring.generate(10),
      req.authData.user.id,
      startLocation,
      destination,
      seats,
      departureDate,
      departureTime,
      new Date().toISOString(),
      new Date().toISOString(),
    ];

    db.query(query, data)
      .then((result) => {
        res.status(201).json({
          status: 'success',
          message: 'Ride offer was successfully created',
          ride: result.rows[0],
        });
      })
      .catch((err) => {
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
        if (result.rows[0].user_id !== user_id) {
          res.status(403).json({
            status: 'error',
            message: 'You don\'t have permission to delete this Ride Offer',
          });
        } else {
          db.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id])
            .then((result) => {
              if (result.rowCount < 1) {
                res.status(200).json({
                  status: 'error',
                  message: 'Ride Offer could not be deleted',
                });
              } else {
                res.status(200).json({
                  status: 'success',
                  message: 'Ride Offer was deleted successfully',
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
            message: 'Ride Offer does not exist',
          });
        } else {
          if(result.rows[0].user_id === req.authData.user.id) {
            res.status(401).json({
              status: 'error',
              message: 'You cannot request for your Ride Offer',
            });
          } else {
            if (result.rows[0].seat < 1) {
              res.status(401).json({
                status: 'error',
                message: 'No available seat! You cannot request for this Ride Offer',
              });
            } else {
              const data = [
                randomstring.generate(10),
                req.params.id,
                req.authData.user.id,
                req.authData.user.name,
                'pending',
                new Date().toISOString(),
                new Date().toISOString(),
              ];

              db.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, user_name, status, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', data)
                .then((result) => {
                  res.status(201).json({
                    status: 'success',
                    message: 'Request was successfully made',
                    request: result.rows[0],
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    status: 'error',
                    message: 'Internal server error. Please try again later',
                  });
                });
            }
          }
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static getRideOfferRequestsForOneRide(req, res) {
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((resultOne) => {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist',
          });
        } else {
          if(resultOne.rows[0].user_id !== req.authData.user.id) {
            res.status(401).json({
              status: 'error',
              message: 'You can not view Requests for a Ride Offer you did not create'
            })
          } else {
            db.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id])
              .then((result) => {
                if (result.rowCount < 1) {
                  res.status(404).json({
                    status: 'error',
                    message: 'No Request was found for this Ride Offer',
                  });
                } else {
                  res.status(200).json({
                    status: 'success',
                    message: `Showing ${result.rowCount} Request(s) for this Ride Offer`,
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
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }

  static respondToRideOfferRequest(req, res) {
    const { status } = req.body;

    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.rideId])
      .then((resultOne) => {
        if (resultOne.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist',
          });
        } else {
          db.query('SELECT * FROM ride_offer_requests WHERE id=$1', [req.params.requestId])
            .then((resultTwo) => {
              if (resultTwo.rowCount < 1) {
                res.status(404).json({
                  status: 'error',
                  message: 'Ride Offer Requests does not exist',
                });
              } else {
                if (resultOne.rows[0].user_id !== req.authData.user.id) {
                  res.status(401).json({
                    status: 'error',
                    message: 'You cannot accept or reject a Requests for a Ride you did not offer',
                  });
                } else {
                  if (resultTwo.rows[0].status !== 'pending') {
                    res.status(401).json({
                      status: 'error',
                      message: 'You cannot respond to this Ride Offer Request again',
                    });
                  } else {
                    if (status === 'rejected') {
                      db.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2', ['rejected', req.params.requestId])
                        .then(() => {
                          res.status(200).json({
                            status: 'success',
                            message: 'Request rejected',
                          });
                        })
                        .catch(() => {
                          res.status(500).json({
                            status: 'error',
                            message: 'Internal server error. Please try again later',
                          });
                        })
                    } else if (status === 'accepted') {
                      if (resultOne.rows[0].seat < 1) {
                        res.status(400).json({
                          status: 'error',
                          message: 'No seat available! You can no longer accept a Requests for this Ride Offer.',
                        });
                      } else {
                        db.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2', ['accepted', req.params.requestId])
                          .then(() => {
                            db.query('UPDATE ride_offers SET seat=seat-1 WHERE id=$1', [req.params.rideId])
                              .then(() => {
                                res.status(200).json({
                                  status: 'success',
                                  message: 'Request accepted',
                                });
                              })
                              .catch(() => {
                                res.status(500).json({
                                  status: 'error',
                                  message: 'Internal server error. Please try again later',
                                });
                              })
                          })
                          .catch(() => {
                            res.status(500).json({
                              status: 'error',
                              message: 'Internal server error. Please try again later',
                            });
                          })
                      }
                    }
                  }
                }
              }
            })
            .catch(() => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              });
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        });
      });
  }
}

module.exports = Rides;
