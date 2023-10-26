import request from 'supertest';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { expressAdapter } from '../../common/adapters/expressAdapter';
import { setAuthRoutes } from '../../auth/routes/authRoutes';
import { AuthController } from '../../auth/controllers/authController';
import { AuthService } from '../../common/services/authService';
import { AuthModel } from '../../auth/models/authModel';

describe('Auth API', () => {
  let app: Express;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
    const authModel = new AuthModel();
    const authService = new AuthService(authModel);
    const authController = new AuthController(authService);
    app = expressAdapter();
    setAuthRoutes(app, authController);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          password: 'password',
        })
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
        })
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in an existing user', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password',
        });
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 if email is incorrect', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password',
        });
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'password',
        })
        .expect(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 if password is incorrect', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password',
        });
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrong',
        })
        .expect(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});