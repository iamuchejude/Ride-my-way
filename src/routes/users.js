import express from 'express';
import Users from '../controllers/users';
import Rides from '../controllers/rides';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, Users.getAllUsers);
router.get('/:id', authMiddleware, Users.getOneUser);
router.put('/:id/:data?', authMiddleware, Users.updateOneUser);
router.post('/rides', authMiddleware, Rides.createRideOffer);
router.get('/rides/:id/requests', authMiddleware, Rides.getRideOfferRequestsForOneRide);
router.put('/rides/:ride_id/requests/:request_id', authMiddleware, Rides.acceptOrRejectRequest);

export default router;
