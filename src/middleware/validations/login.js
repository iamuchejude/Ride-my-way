import validateEmail from './../../util/validate_email';

const validate = (req, res, next) => {
  if (!req.body.email || req.body.email === null || req.body.email === undefined) {
    res.status(403).json({
      status: 'error',
      message: 'Please provide a valid Email',
    });
    return false;
  }

  if (!req.body.password || req.body.password === null || req.body.password === undefined) {
    res.status(403).json({
      status: 'error',
      message: 'Please provide password',
    });
    return false;
  }

  if (!validateEmail(req.body.email)) {
    res.status(403).json({
      status: 'error',
      message: 'Email is invalid',
    });
    return false;
  }

  next();
};

export default validate;
