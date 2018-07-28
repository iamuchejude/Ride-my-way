import express from 'express';
import multer from 'multer';
import Users from '../controllers/users';
import Rides from '../controllers/rides';
import checkAuth from '../middleware/auth';
import createRideValidation from '../middleware/validations/create_ride';
import rideRequestValidation from '../middleware/validations/request_response';
import updatePasswordValidation from '../middleware/validations/update_password';
import updatePhotoValidation from '../middleware/validations/update_photo';
import updateProfileValidation from '../middleware/validations/update_profile';

const router = express.Router();

router.get('/', checkAuth, Users.getAllUsers);
router.get('/:id', checkAuth, Users.getOneUser);
router.put('/:id/profile', checkAuth, updateProfileValidation, Users.updateUserProfile);
router.put('/:id/password', checkAuth, updatePasswordValidation, Users.updateUserPassword);
router.put('/:id/photo', checkAuth, updatePhotoValidation, Users.updateUserPhoto);
router.post('/rides', checkAuth, createRideValidation, Rides.createRideOffer);
router.get('/rides/:id/requests', checkAuth, Rides.getRideOfferRequestsForOneRide);
router.put('/rides/:rideId/requests/:requestId', checkAuth, rideRequestValidation, Rides.acceptOrRejectRequest);

export default router;
