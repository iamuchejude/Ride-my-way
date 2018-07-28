const validate = (req, res, next) => {
  if(req.body.photo === undefined || req.body.photo === null) {
    res.status(400).json({
      status: 'error',
      message: 'Please provide a valid URL for a photo'
    })
  }
};

export default validate;