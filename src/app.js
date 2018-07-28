import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import env from 'dotenv';
import log from 'fancy-log';
import rideRoutes from './routes/rides';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.all('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Ride My Way API',
  })
})

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found',
  });
});

app.listen(port, () => {
  log.info(`Listening on port ${port}`);
});

export default app;
