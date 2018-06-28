import express from 'express';
import Users from '../controllers/usersController';

const Router = express.Router();

Router.get('/users', (req, res) => {
    res.json({
        message: 'Return all Users list'
    });
});

Router.get('/users/:id', Users.getOneUser);