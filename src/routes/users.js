import express from 'express';
import Users from '../controllers/usersController';
import Rides from '../controllers/ridesController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, Users.getAllUsers);
router.get('/:id', authMiddleware, Users.getOneUser);
router.post('/rides', authMiddleware, Rides.createRideOffer);
router.get('/rides/:id/requests', authMiddleware, Rides.getRideOfferRequestsForOneRide);
router.put('/rides/:ride_id/requests/:request_id', authMiddleware, Rides.acceptOrRejectRequest);

export default router;