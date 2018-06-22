import RideOffers from '../models/rideOffersModel';
import RideRequests from '../models/rideRequestsModel';

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
    const { id } = parseInt(req.params, 10);
    const rideOffer2 = RideOffers.getOneOffer(id);
    const rideOffer = RideOffers.getOneOffer(2);

    if (rideOffer === false) {
      res.status(400).json({
        status: 'error',
        message: 'Ride not found',
        rideOffer2,
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
      userId,
      startLocation,
      destination,
      price,
      seat,
      departureDate,
      departureTime,
      createdAt,
    } = req.body;

    const data = {
      id: RideOffers.getOffers.length,
      userId,
      startLocation,
      destination,
      price,
      seat,
      departureDate,
      departureTime,
      createdAt,
    };

    RideOffers.getOffers.push(data).then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Ride offer was added successfully',
        data,
      });
    }).catch(() => {
      res.status(422).json({
        status: 'error',
        message: 'Unable to add ride offer',
      });
    });
  }

  static getAllRideRequests(req, res) {
    if (RideRequests.getRequests().length >= 1) {
      res.status(200).json({
        status: 'success',
        message: 'Available ride requests',
        data: RideOffers.getRequests(),
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'No available ride request',
      });
    }
  }

  static getOneRideRequest(req, res) {
    const { id } = parseInt(req.params, 10);
    const rideOffer = RideOffers.getOneOffer(id);

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

  static createRideRequest(req, res) {
    const { id } = parseInt(req.params, 10);
    const { userId, createdAt } = req.body;

    const data = {
      id,
      userId,
      createdAt,
    };
    if (RideRequests.push(data)) {
      res.status(200).json({
        status: 'Success',
        message: 'MESSAGE',
        data,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Error Creating Ride Request',
      });
    }
  }
};
