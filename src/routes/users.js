import express from 'express';
import Users from '../controllers/usersController';
import Rides from '../controllers/ridesController';

const router = express.Router();

router.get('/', Users.getAllUsers);
router.get('/:id', Users.getOneUser);
router.post('/rides', Rides.createRideOffer);
router.get('/rides/:id/requests', Rides.getRideOfferRequestsForOneRide);
router.put('/rides/:ride_id/requests/:request_id', Rides.acceptOrRejectRequest);

export default router;