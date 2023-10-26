import express from 'express';
import bodyParser from 'body-parser';
import { setBookRoutes } from './routes/bookRoutes';
import { setUserRoutes } from './routes/userRoutes';
import { errorHandler } from '../common/middlewares/errorHandler';
import { logger } from '../common/middlewares/logger';
import { validator } from '../common/middlewares/validator';
import { expressAdapter } from '../common/adapters/expressAdapter';
import { connect } from '../db';
import { BookModel } from './models/bookModel';
import { UserModel } from './models/userModel';

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connect();

// Set up middleware
app.use(bodyParser.json());
app.use(logger);
app.use(validator);

// Set up routes
setBookRoutes(app, new BookModel());
setUserRoutes(app, new UserModel());

// Set up error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default expressAdapter(app);