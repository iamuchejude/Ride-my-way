const validate = (req, res, next) => {
  if (!req.body.status || req.body.status === undefined || req.body.status === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid status(accepted or rejected)',
    });
  }

  if (req.body.status === 'accepted') return next();
  if (req.body.status === 'rejected') return next();
  return res.status(400).json({
    status: 'error',
    message: "Status should either be 'accepted' or 'rejected'",
  });
};

export default validate;
