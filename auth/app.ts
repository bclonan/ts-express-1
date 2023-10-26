import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setAuthRoutes } from './routes/authRoutes';
import { errorHandler } from '../common/middlewares/errorHandler';
import { logger } from '../common/middlewares/logger';
import { mongooseAdapter } from '../common/adapters/mongooseAdapter';
import { AuthController } from './controllers/authController';
import { AuthModel } from './models/authModel';
import { AuthService } from '../common/services/authService';
import { AuthConfig } from './config';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(logger);

// Routes
const authModel = new AuthModel(mongooseAdapter);
const authService = new AuthService(authModel);
const authController = new AuthController(authService);
setAuthRoutes(app, authController);

// Error handling middleware
app.use(errorHandler);

// Start server
const port = AuthConfig.PORT;
app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});