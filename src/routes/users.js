import express from 'express';
import Users from '../controllers/users';
import Rides from '../controllers/rides';
import checkAuth from '../middleware/auth';

const router = express.Router();

router.get('/', checkAuth, Users.getAllUsers);
router.get('/:id', checkAuth, Users.getOneUser);
router.put('/:id/:data?', checkAuth, Users.updateOneUser);
router.post('/rides', checkAuth, Rides.createRideOffer);
router.get('/rides/:id/requests', checkAuth, Rides.getRideOfferRequestsForOneRide);
router.put('/rides/:ride_id/requests/:request_id', checkAuth, Rides.acceptOrRejectRequest);

export default router;
