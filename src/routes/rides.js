import express from 'express';
import Rides from '../controllers/rides';
import checkAuth from '../middleware/auth';

const router = express.Router();

router.get('/', checkAuth, Rides.getAllRideOffers);
router.get('/:id', checkAuth, Rides.getOneRideOffer);
router.delete('/:id', checkAuth, Rides.deleteOneRideOffer);
router.post('/:id/requests', checkAuth, Rides.createRideOfferRequest);

export default router;
