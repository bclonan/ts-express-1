import { Request, Response } from 'express';
import { BookService } from '../../common/services/bookService';
import { Book } from '../../common/types';

export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const book: Book = req.body;
      const createdBook: Book = await this.bookService.create(book);
      res.status(201).json(createdBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async read(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const book: Book = await this.bookService.read(id);
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const book: Book = req.body;
      const updatedBook: Book = await this.bookService.update(id, book);
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.bookService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    try {
      const books: Book[] = await this.bookService.list();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}