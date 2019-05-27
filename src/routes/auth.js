import express from 'express';

import loginMiddleware from './../middleware/validations/login';
import registerMiddleware from './../middleware/validations/register';

import Auth from '../controllers/auth';

const router = express.Router();

router.post('/login', loginMiddleware, Auth.login);
router.post('/register', registerMiddleware, Auth.register);

export default router;
