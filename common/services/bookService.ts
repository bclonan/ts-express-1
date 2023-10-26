import { Model } from 'mongoose';
import { Book } from '../types';
import { BookModel } from '../db/models';

export class BookService {
  private bookModel: Model<Book>;

  constructor() {
    this.bookModel = BookModel;
  }

  async createBook(book: Book): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook.toObject();
  }

  async getBookById(id: string): Promise<Book | null> {
    const book = await this.bookModel.findById(id).lean();
    return book;
  }

  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel.find().lean();
    return books;
  }

  async updateBook(id: string, book: Book): Promise<Book | null> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true }).lean();
    return updatedBook;
  }

  async deleteBook(id: string): Promise<Book | null> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).lean();
    return deletedBook;
  }
}