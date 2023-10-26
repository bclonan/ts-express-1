import request from 'supertest';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { expressAdapter } from '../../common/adapters/expressAdapter';
import { UserService } from '../../common/services/userService';
import { User } from '../../db/models';

describe('User API', () => {
  let app: Express;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
    app = expressAdapter();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /users', () => {
    it('should return an empty array when there are no users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return an array of users when there are users', async () => {
      const userService = new UserService();
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      });
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: user.id,
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      ]);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password',
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
    });

    it('should return a 400 error when the request body is invalid', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Jane Doe',
          password: 'password',
        });
      expect(response.status).toBe(400);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const userService = new UserService();
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      });
      const response = await request(app).get(`/users/${user.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: user.id,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    });

    it('should return a 404 error when the user is not found', async () => {
      const response = await request(app).get('/users/123');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by ID', async () => {
      const userService = new UserService();
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      });
      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: 'Jane Doe',
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: user.id,
        name: 'Jane Doe',
        email: 'john.doe@example.com',
      });
    });

    it('should return a 404 error when the user is not found', async () => {
      const response = await request(app)
        .put('/users/123')
        .send({
          name: 'Jane Doe',
        });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
      const userService = new UserService();
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      });
      const response = await request(app).delete(`/users/${user.id}`);
      expect(response.status).toBe(204);
      const deletedUser = await User.findById(user.id);
      expect(deletedUser).toBeNull();
    });

    it('should return a 404 error when the user is not found', async () => {
      const response = await request(app).delete('/users/123');
      expect(response.status).toBe(404);
    });
  });
});