import express from 'express';
import bodyParser from 'body-parser';
import { setBookRoutes } from './routes/bookRoutes';
import { setUserRoutes } from './routes/userRoutes';
import { errorHandler } from '../common/middlewares/errorHandler';
import { logger } from '../common/middlewares/logger';
import { connect } from '../db';
import { config } from './config';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
setBookRoutes(app);
setUserRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connect()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err}`);
  });