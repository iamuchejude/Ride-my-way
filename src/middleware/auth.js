import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({
      status: 'error',
      message: 'Authentication failed! Please login and try again',
      err: 'error1',
    });
  }

  const token = authorization.split(' ')[1].trim();

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed! Please login again to continue',
        error,
      });
    }
    req.authData = decoded;
    next();
  });
};
