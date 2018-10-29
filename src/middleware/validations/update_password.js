const validate = (req, res, next) => {
  if (!req.body.password || req.body.password === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a password',
    });
  }

  if (req.body.password.length >= 6) return next();

  return res.status(400).json({
    status: 'error',
    message: 'Password is too short. Password must contain at least 6 characters',
  });
};

export default validate;