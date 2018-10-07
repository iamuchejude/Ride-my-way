import express from 'express';
import Auth from '../controllers/auth';
import loginMiddleware from './../middleware/validations/login';
import registerMiddleware from './../middleware/validations/register';

const router = express.Router();

router.post('/login', loginMiddleware, Auth.login);
router.post('/register', registerMiddleware, Auth.register);

export default router;
