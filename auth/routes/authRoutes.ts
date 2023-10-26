import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { expressAdapter } from '../../common/adapters/expressAdapter';

export function setAuthRoutes(router: Router, authController: AuthController): void {
  router.post('/login', expressAdapter(authController.login));
  router.post('/register', expressAdapter(authController.register));
}