const RideOffers = require('../models/rideOffersModel');
const RideRequests = require('../models/rideRequestsModel');

module.exports = class Rides {
  static getAllRideOffers(req, res) {
    if (RideOffers.getOffers().length >= 1) {
      res.status(200).json({
        status: 'success',
        message: 'Available ride offers',
        data: RideOffers.getOffers(),
      });
    }

    res.status(404).json({
      status: 'error',
      message: 'No Ride Offer available',
    });
  }

  static getOneRideOffer(req, res) {
    const rideOffer = RideOffers.getOneOffer(parseInt(req.params.id, 10));

    if (rideOffer === false) {
      res.status(400).json({
        status: 'error',
        message: 'Ride not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Ride found',
        data: rideOffer,
      });
    }
  }

  static createRideOffer(req, res) {
    const {
      userId, startLocation, destination, price, seat, departureDate, departureTime,
    } = req.body;

    const data = {
      id: RideOffers.getOffers().length + 1,
      userId,
      startLocation,
      destination,
      price,
      seat,
      departureDate,
      departureTime,
      createdAt: new Date().toISOString(),
    };

    RideOffers.createOffer(data);
    res.status(200).json({
      status: 'success',
      message: 'Ride offer was added successfully',
      data,
    });
  }

  static createRideOfferRequest(req, res) {
    // Check if Ride Offer is existing
    const ride = RideOffers.getOneOffer(parseInt(req.params.id, 10));
    if (ride === false) {
      res.status(400).json({
        status: 'error',
        message: 'Bad Request - ID was not found',
      });
    }

    const { userId } = req.body;

    const data = {
      id: RideRequests.getOfferRequests().length + 1,
      rideId: parseInt(req.params.id, 10),
      userId,
      createdAt: new Date().toISOString(),
    };
    RideRequests.createOfferRequest(data);
    res.status(200).json({
      status: 'success',
      message: 'Ride request was created successfully',
      data,
    });
  }
};
