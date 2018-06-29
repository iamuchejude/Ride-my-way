const db = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const env = require('dotenv');

env.config();

class Rides {
  static getAllRideOffers(req, res) {
    db.query('SELECT * FROM ride_offers')
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(200).json({
            status: 'success',
            message: 'No Ride Offer Available',
            data: result.rows,
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
        res.status(400).json({
          status: 'error',
          message: 'Error Occured',
          error
        })
      })
  }

  static getOneRideOffer(req, res) {
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(404).json({
            status: 'error',
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
        res.status(400).json({
          status: 'error',
          message: 'Error Occured',
          error
        })
      })
  }

  static createRideOffer(req, res) {
    const {
      userId, startFrom, destination, price, seat, departureDate, departureTime,
    } = req.body;

    const query = "INSERT INTO ride_offers(id, user_id, start_from, destination, price, seat, departure_date, departure_time, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    const data = [
      uuidv1(),
      userId,
      startFrom,
      destination,
      price,
      seat,
      departureDate,
      departureTime,
      new Date().toISOString()
    ]

    db.query(query, data)
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(400).json({
            status: 'error',
            message: 'Ride offer was not successfully added',
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
          message: 'Error Occured',
          error
        });
      })
  }

  static createRideOfferRequest(req, res) {
    // Check if Ride Offer is existing
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(400).json({
            status: 'error',
            message: 'Bad Request - ID was not found',
          })
        } else {
          const { userId } = req.body;
          const data = [
            uuidv1(),
            req.params.id,
            userId,
            0,
            new Date().toISOString(),
          ];
          
          db.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, status, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *', data)
            .then((result) => {
              if(result.rows[0] < 1) {
                res.status(400).json({
                  status: 'error',
                  message: 'Ride offer request was not created successfully',
                  data: result.rows[0],
                });
              } else {
                res.status(201).json({
                  status: 'success',
                  message: 'Ride offer request was created successfully',
                  data: result.rows[0],
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                status: 'error',
                message: 'Unexpected Error Occured',
                error,
              });
            })
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured',
        })
      });
  }

  static getRideOfferRequestsForOneRide(req, res) {
    // Check if Ride Offer is existing
    db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      .then((result) => {
        if(result.rowCount < 1) {
          res.status(400).json({
            status: 'error',
            message: 'Bad Request - ID was not found',
          })
        } else {
          db.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id])
          .then((result) => {
            if(result.rowCount < 1) {
              res.status(404).json({
                status: 'error',
                message: 'No request for this ride',
                data: result.rows,
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
              message: 'Error Occured',
              error,
            })
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured',
          error,
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
                ride_requests = result.rows;
                
                if(ride_offer.user_id !== userId) {
                    res.status(401).json({
                      status: 'error',
                      message: 'You don\'t have permission to accept or reject this ride',
                    });
                } else {
                  let message
                  if(status === 1){
                    message = 'Request Accepted';
                  } else if(status === 2) {
                    message = 'Request Rejected';
                  }
                  db.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2 RETURNING *', [status, requestId])
                    .then((result) => {
                      res.status(200).json({
                        status: success,
                        message,
                        data: result.rows[0]
                      });
                    })
                    .catch((error) => {
                      res.status(500).json({
                        status: 'error',
                        message: 'Unexpected Error Occured',
                        error
                      });
                    });
                }
              }
            })
            .catch((errorNow) => {
              res.status(500).json({
                status: 'error',
                message: 'Error Occured One',
                error: errorNow,
              })
            })
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 'error',
          message: 'Error Occured Two',
          error,
        })
      })
  }
}

module.exports = Rides;