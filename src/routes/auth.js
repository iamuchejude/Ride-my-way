import express from 'express';
import Auth from '../controllers/authController';

const Router = express.Router();

Router.get('/login', Auth.login);
Router.post('/register', Auth.register);
Router.get('/recover', Auth.recover);