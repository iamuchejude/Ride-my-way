import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import router from './routes/rides';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.use((req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Ride my way API',
    router,
  });
  next();
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
exports.server = server;
