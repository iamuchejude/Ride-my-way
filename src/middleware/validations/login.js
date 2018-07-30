import validateEmail from './../../util/validate_email';

const validate = (req, res, next) => {
  if (!req.body.email || req.body.email === null || req.body.email === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid Email',
    });
  }

  if (!req.body.password || req.body.password === null || req.body.password === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide password',
    });
  }

  if (!validateEmail(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is invalid',
    });
  }

  next();
};

export default validate;
