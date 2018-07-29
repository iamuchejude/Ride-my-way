import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import env from 'dotenv';
import log from 'fancy-log';
import rideRoutes from './routes/rides';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.resolve(__dirname, '../docs')));

app.all('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Ride My Way API',
  })
})
app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.get('/api/v1/docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../docs/index.html'));
});
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

console.log(path.resolve(__dirname, '../docs'));