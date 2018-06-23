import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import { router as Router } from './routes/rides';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', Router);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
exports.server = server;
