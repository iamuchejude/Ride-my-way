const validate = (req, res, next) => {
  if (req.body.photo === undefined || req.body.photo.length < 1) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid URL for a photo'
    });
  }
  return next();
};

export default validate;