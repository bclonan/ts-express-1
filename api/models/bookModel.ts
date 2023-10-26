import { Schema, model, Document } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<Book>('Book', bookSchema);