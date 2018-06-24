import express from 'express';
import Rides from '../controllers/ridesController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is ready to serve',
  });
});
router.get('/rides', Rides.getAllRideOffers);
router.get('/rides/:id', Rides.getOneRideOffer);
router.post('/rides', Rides.createRideOffer);
router.post('/rides/:id/requests', Rides.createRideOfferRequest);

export default router;
