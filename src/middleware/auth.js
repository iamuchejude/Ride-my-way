import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Login failed! Please login and try again',
    });
  }

  const token = req.headers.authorization.split(' ')[1].trim();
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Login expired! Please login again to continue',
      });
    } else {
      req.authData = decoded;
      next();
    }
  });
};
