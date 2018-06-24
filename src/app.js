import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import env from 'dotenv';
import log from 'fancy-log';
import routes from './routes/rides';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.listen(port, () => {
  log.info(`Listening on port ${port}`);
});

export default app;
