const validate = (req, res, next) => {
  if (!req.body.password || req.body.password === undefined || req.body.password === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a password',
    });
  }

  if (req.body.password.length < 6) {
    return res.status(400).json({
      status: 'error',
      message: 'Password is too short. Password must contain at least 6 characters'
    });
  }

  next();

}

export default validate;