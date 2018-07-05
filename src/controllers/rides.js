import db from '../database/connection';
import uuidv1 from 'uuid/v1';
import env from 'dotenv';

env.config();

class Rides {
  static getAllRideOffers(req, res) {
    db.query('SELECT * FROM ride_offers')
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(404).json({
            status: 'success',
            message: 'No Ride Offer Available',
          })
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning all available ride offers',
            data: result.rows,
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        })
      })
  }

  static getOneRideOffer(req, res) {
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride was not found'
          })
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Returning ride offer',
            data: result.rows[0],
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        })
      })
  }

  static createRideOffer(req, res) {
    const {
      userId, startFrom, destination, price, seat, departureDate, departureTime,
    } = req.body;
    const query = "INSERT INTO ride_offers(id, user_id, start_from, destination, price, seat, departure_date, departure_time, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const data = [
      uuidv1(),
      userId,
      startFrom,
      destination,
      price,
      seat,
      departureDate,
      departureTime,
      new Date().toISOString(),
      new Date().toISOString()
    ]

    db.query(query, data)
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(409).json({
            status: 'error',
            message: 'Oops! Ride offer was not added',
          });
        } else {
          res.status(201).json({
            status: 'success',
            message: 'Ride offer was added successfully',
            data: result.rows[0]
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        })
      })
  }

  static deleteOneRideOffer(req, res) {
    const user_id = req.authData.user.id;
    
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if (user_id !== result.rows[0].user_id) {
          res.status(403).json({
            status: 'error',
            message: 'You don\'t have permission to delete this ride offer'
          })
        } else {
          db.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id])
            .then((result) => {
              if (result.rowCount < 1) {
                res.status(200).json({
                  status: 'error',
                  message: 'Ride offer could not be deleted'
                })
              } else {
                res.status(200).json({
                  status: 'success',
                  message: 'Ride offer was deleted successfully'
                })
              }
            })
            .catch((error) => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              })
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        })
      });
  }

  static createRideOffer(req, res) {
    const {
      userId, startFrom, destination, price, seat, departureDate, departureTime,
    } = req.body;

    if ((userId === undefined || userId.trim().length < 1) || 
        (startFrom === undefined || startFrom.trim().length < 1) ||
        (destination === undefined || destination.trim().length < 1) ||
        (price === undefined || price.trim().length < 1) ||
        (seat === undefined || seat.trim().length < 1) ||
        (departureDate === undefined || departureDate.trim().length < 1) ||
        (departureTime === undefined || departureTime.trim().length < 1)) {
      res.status(409).json({
        status: 'error',
        message: 'Please provide all required data'
      });
    } else {

      db.query("SELECT * FROM ride_offers WHERE user_id=$1, departure_date=$2 AND departure_time=$3", checkData)
        .then((res) => {
          if(res.rowCount > 0) {
            
          }
        })
        .catch((err) => {
          res.status(500).json({
            status: 'error',
            message: 'Internal server error. Please try again later',
          })
        });


      const query = "INSERT INTO ride_offers(id, user_id, start_from, destination, price, seat, departure_date, departure_time, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
      const data = [
        uuidv1(),
        userId,
        startFrom,
        destination,
        price,
        seat,
        departureDate,
        departureTime,
        new Date().toISOString(),
        new Date().toISOString()
      ]

      db.query(query, data)
        .then((result) => {
          if(result.rowCount < 1) {
            res.status(409).json({
              status: 'error',
              message: 'Oops! Ride offer was not added',
            });
          } else {
            res.status(201).json({
              status: 'success',
              message: 'Ride offer was added successfully',
              data: result.rows[0]
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status: 'error',
            message: 'Internal server error. Please try again later',
          })
        })
    }
  }

  static createRideOfferRequest(req, res) {
    // Check if Ride Offer is existing
    if(req.body.userId === undefined || req.body.userId.trim().length < 1) {
      res.status(409).json({
        status: 'error',
        message: 'Please provide a valid user ID'
      });
    } else {
      db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
        .then((result) => {
          if(result.rowCount < 1) {
            res.status(404).json({
              status: 'error',
              message: 'Ride offer does not exist',
            })
          } else {
            const { userId } = req.body;
            if(userId === req.authData.user.id) {
              res.status(400).json({
                status: 'error',
                message: 'Sorry, You cannot request for your ride',
              });
            } else {
              const data = [
                uuidv1(),
                req.params.id,
                userId,
                'pending',
                new Date().toISOString(),
                new Date().toISOString(),
              ];
              
              db.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, status, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', data)
                .then((result) => {
                  if(result.rowCount >= 1) {
                    res.status(201).json({
                      status: 'success',
                      message: 'Request was successfully made',
                      data: result.rows[0],
                    });
                  } else {
                    res.status(400).json({
                      status: 'error',
                      message: 'Request was not successfully made',
                    });
                  }
                })
                .catch((error) => {
                  res.status(500).json({
                    status: 'error',
                    error,
                    message: 'Internal server error. Please try again later',
                  })
                })
            }
          }
        })
        .catch((error) => {
          res.status(500).json({
            status: 'error',
            error,
            message: 'Internal server error. Please try again later',
          })
        });
    }
  }

  static getRideOfferRequestsForOneRide(req, res) {
    // Check if Ride Offer is existing
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride does not exist.',
          })
        } else {
          db.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id])
          .then((result) => {
            if(result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'No request for this ride',
              })
            } else {
              res.status(200).json({
                status: 'success',
                message: 'Available Ride requests for this ride offer',
                data: result.rows,
              })
            }
          })
          .catch((error) => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              })
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        })
      });
  }

  static acceptOrRejectRequest(req, res) {
    const { userId, status } = req.body;
    let ride_offer;
    let ride_requests;
    
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.ride_id])
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
            message: 'Ride Offer does not exist',
          })
        } else {
          ride_offer = result.rows[0];
          db.query('SELECT * FROM ride_offer_requests WHERE id=$1', [req.params.request_id])
            .then((result) => {
              if(result.rowCount < 1) {
                res.status(404).json({
                  status: 'error',
                  message: 'Request does not exist'
                })
              } else {
                ride_requests = result.rows[0];
                if(ride_offer.user_id !== req.authData.user.id) {
                    res.status(403).json({
                      status: 'error',
                      message: 'You don\'t have permission to accept or reject this ride',
                    });
                } else {
                  if (status === 'accepted') {
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
                        })
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
                                data: ures.rows[0]
                              });
                            })
                            .catch((errU) => {
                              res.status(500).json({
                                status: 'error',
                                message: 'Internal server error. Please try again later',
                              })
                            });
                        } else {
                          res.status(200).json({
                            status: 'success',
                            message: `Request has been ${status}`,
                            data: result.rows[0]
                          });
                        }
                      })
                      .catch((error) => {
                        res.status(500).json({
                          status: 'error',
                          message: 'Internal server error. Please try again later',
                        })
                      });
                  }
                }
              }
            })
            .catch((errorNow) => {
              res.status(500).json({
                status: 'error',
                message: 'Internal server error. Please try again later',
              })
            })
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later',
        })
      })
  }
}

module.exports = Rides;