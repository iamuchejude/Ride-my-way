import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
        if(error) {
            res.status(401).json({
                status: 'error',
                message: 'Auth Failed'
            })
        } else {
            req.authData = decoded;
            next();
        }
    });
}