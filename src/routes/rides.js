import express from 'express';
import Rides from '../controllers/ridesController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, Rides.getAllRideOffers);
router.get('/:id', authMiddleware, Rides.getOneRideOffer);
router.post('/:id/requests', authMiddleware, Rides.createRideOfferRequest);

export default router;
