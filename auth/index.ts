import express from 'express';
import mongoose from 'mongoose';
import { setAuthRoutes } from './routes/authRoutes';
import { errorHandler } from '../common/middlewares/errorHandler';
import { logger } from '../common/middlewares/logger';
import { AuthController } from './controllers/authController';
import { AuthService } from '../common/services/authService';
import { AuthModel } from './models/authModel';
import { authConfig } from './config';

const app = express();
const authService = new AuthService(new AuthModel(mongoose));
const authController = new AuthController(authService);

app.use(express.json());
app.use(logger);

setAuthRoutes(app, authController);

app.use(errorHandler);

mongoose.connect(authConfig.dbUrl, authConfig.dbOptions).then(() => {
  app.listen(authConfig.port, () => {
    console.log(`Auth service listening on port ${authConfig.port}`);
  });
}).catch((err) => {
  console.error(`Error connecting to database: ${err}`);
});