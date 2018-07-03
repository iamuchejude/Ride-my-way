import express from 'express';
import Auth from '../controllers/auth';

const router = express.Router();

router.post('/login', Auth.login);
router.post('/register', Auth.register);
// router.get('/auth/recover', Auth.recover);

export default router;