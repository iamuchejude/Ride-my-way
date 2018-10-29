import db from './../../database/connection';

const validate = (req, res, next) => {
  if (!req.body.startLocation || req.body.startLocation === undefined || req.body.startLocation === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a Start Location',
    });
  }

  if (!req.body.destination || req.body.destination === undefined || req.body.destination === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a Destination',
    });
  }

  if (!req.body.seats || req.body.seats === undefined || req.body.seats === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide number of Seats available',
    });
  } else if (req.body.seats < 1) {
    return res.status(400).json({
      status: 'error',
      message: 'Number of Seats available must be at least, 1',
    });
  }

  if (!req.body.departureDate || req.body.departureDate === undefined || req.body.departureDate === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide Departure Date',
    });
  }

  if (!req.body.departureTime || req.body.departureTime === undefined || req.body.departureTime === null) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide Time of Departure',
    });
  }

  const dateProvided = Date.parse(req.body.departureDate);
  const currentDate = Date.parse(new Date());

  if (dateProvided < currentDate) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a future date as Date of Departure',
    });
  }

  db.query('SELECT * FROM ride_offers WHERE user_id=$1 AND departure_time=$2 AND departure_date=$3', [req.authData.user.id, req.body.departureTime, req.body.departureDate])
    .then((result) => {
      if (result.rowCount >= 1) {
        res.status(400).json({
          status: 'error',
          message: 'You have a ride to offer at this time',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error. Please try again later',
      });
    });

  next();
};

export default validate;
