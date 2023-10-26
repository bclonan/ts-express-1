import { Document } from 'mongoose';

interface Book {
  title: string;
  author: string;
  description: string;
}

interface BookDocument extends Book, Document {}

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserDocument extends User, Document {}

export { Book, BookDocument, User, UserDocument };