import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import switchPointRouter from './controllers/switchPoint';
import {
  requestLogger,
  unKnownEndpoint,
  errorLogger,
  errorResponder,
} from './utils/middleware';
import electricityPriceRouter from './controllers/electricityPrice';
import testingRouter from './controllers/testing';
import {
  cronJobToUpdateSwitchPoints,
  updateSwitchPoints,
} from './utils/scheduledFunctions';
import { connectToDatabase } from './utils/dataBase';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// connect to database
void connectToDatabase();

app.use(requestLogger);

// update switch points every hour
if (process.env.NODE_ENV !== 'test') {
  cronJobToUpdateSwitchPoints.start();
}

// update switch points on startup
void updateSwitchPoints();

// routers for apis
app.use('/api', switchPointRouter);
app.use('/api', electricityPriceRouter);

app.get('/favicon.ico', (_req, res) => res.status(204));

// clear database router when doing integration tests
if (process.env.NODE_ENV === 'test') {
  app.use('/api', testingRouter);
}

app.use(errorLogger);

app.use(errorResponder);

app.use(unKnownEndpoint);

export default app;
