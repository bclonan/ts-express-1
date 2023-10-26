import request from 'supertest';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { expressAdapter } from '../../common/adapters/expressAdapter';
import { BookController } from '../../api/controllers/bookController';
import { BookService } from '../../common/services/bookService';
import { errorHandler } from '../../common/middlewares/errorHandler';
import { logger } from '../../common/middlewares/logger';
import { validator } from '../../common/middlewares/validator';

describe('BookController', () => {
  let app: Express;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
    const bookService = new BookService();
    const bookController = new BookController(bookService);
    app = expressAdapter(bookController);
    app.use(logger);
    app.use(validator);
    app.use(errorHandler);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /books', () => {
    it('should return an empty array', async () => {
      const response = await request(app).get('/books');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /books', () => {
    it('should create a new book', async () => {
      const book = { title: 'Test Book', author: 'Test Author' };
      const response = await request(app).post('/books').send(book);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(book);
    });
  });
});