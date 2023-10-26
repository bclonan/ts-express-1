import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

export interface Book extends Document {
  title: string;
  author: string;
  description: string;
  price: number;
}