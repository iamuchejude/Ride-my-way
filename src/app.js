import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import pino from 'pino';
import routes from './routes/rides';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

const server = app.listen(port, () => {
  pino().info(`Listening on port ${port}`);
});

export default server;
