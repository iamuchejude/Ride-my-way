import express from 'express';
import Rides from '../controllers/ridesController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(400).json({
    status: 'error',
    message: 'Not found',
  });
});

router.get('/rides', Rides.getAllRideOffers);

export default router;
