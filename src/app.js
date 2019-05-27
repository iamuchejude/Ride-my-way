import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import env from 'dotenv';
import log from 'fancy-log';

import routes from './routes';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.resolve(__dirname, '../docs')));

app.use('/api/v1', routes);

app.get('/api/v1/docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../docs/index.html'));
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found',
  });
});

const server = app.listen(port, () => {
  log.info(`Listening on port ${port}`);
});

export default server;
