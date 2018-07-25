const validate = (req, res, next) => {
  const {
    startFrom, destination, seat, departureDate, departureTime,
  } = req.body;

  next();
};

export default validate;
