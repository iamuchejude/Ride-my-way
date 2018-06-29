import express from 'express';
import Rides from '../controllers/ridesController';

const router = express.Router();

router.get('/', Rides.getAllRideOffers);
router.get('/:id', Rides.getOneRideOffer);
router.post('/:id/requests', Rides.createRideOfferRequest);

export default router;
