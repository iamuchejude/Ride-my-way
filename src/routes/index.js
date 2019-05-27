import express from 'express';

const router = express.Router();

import rideRoutes from './rides';
import authRoutes from './auth';
import userRoutes from './users';

router.all('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Ride My Way API',
  });
});

router.use('/rides', rideRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
