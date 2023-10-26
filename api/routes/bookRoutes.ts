import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { errorHandler } from '../../common/middlewares/errorHandler';
import { validator } from '../../common/middlewares/validator';
import { Book } from '../models/bookModel';

export function setBookRoutes(router: Router): void {
  const bookController = new BookController(Book);

  router.get('/books', errorHandler(bookController.getBooks));
  router.get('/books/:id', validator('params', Book.schema), errorHandler(bookController.getBookById));
  router.post('/books', validator('body', Book.schema), errorHandler(bookController.createBook));
  router.put('/books/:id', validator('params', Book.schema), validator('body', Book.schema), errorHandler(bookController.updateBook));
  router.delete('/books/:id', validator('params', Book.schema), errorHandler(bookController.deleteBook));
}