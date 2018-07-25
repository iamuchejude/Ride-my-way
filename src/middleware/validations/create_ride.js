import db from './../../database/connection';

const validate = (req, res, next) => {
  if (!req.body.startLocation || req.body.startLocation === undefined || req.body.startLocation === null) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide a Start Location',
    });
  }

  if (!req.body.destination || req.body.destination === undefined || req.body.destination === null) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide a Destination',
    });
  }

  if (!req.body.seats || req.body.seats === undefined || req.body.seats === null) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide number of Seats available',
    });
  } else if (req.body.seats < 1) {
    return res.status(403).json({
      status: 'error',
      message: 'Number of Seats available must be at least, 1',
    });
  }

  if (!req.body.departureDate || req.body.departureDate === undefined || req.body.departureDate === null) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide Departure Date',
    });
  }

  if (!req.body.departureTime || req.body.departureTime === undefined || req.body.departureTime === null) {
    return res.status(403).json({
      status: 'error',
      message: 'Please provide Time of Departure',
    });
  }

  const query = 'SELECT * FROM ride_offers WHERE user_id=$1, departure_date=$2 AND departure_time=$3';
  const data = [req.authData.user.id, req.body.departureDate, req.body.departureTime];
  db.query(query, data)
    .then((result) => {
      if (result.rowCount >= 1) {
        res.status(403).json({
          status: 'error',
          message: 'You have a ride to offer at this time',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        err,
        message: 'Internal server error. Please try again later',
      });
    });

  next();
};

export default validate;
