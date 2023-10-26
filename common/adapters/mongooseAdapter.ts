import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export function mongooseAdapter<T extends Document>(
  model: Model<T>
): {
  create: (data: any) => Promise<T>;
  findById: (id: string | ObjectId) => Promise<T | null>;
  findOne: (query: any) => Promise<T | null>;
  find: (query: any) => Promise<T[]>;
  update: (id: string | ObjectId, data: any) => Promise<T | null>;
  delete: (id: string | ObjectId) => Promise<boolean>;
} {
  async function create(data: any): Promise<T> {
    const doc = new model(data);
    await doc.save();
    return doc;
  }

  async function findById(id: string | ObjectId): Promise<T | null> {
    return model.findById(id).exec();
  }

  async function findOne(query: any): Promise<T | null> {
    return model.findOne(query).exec();
  }

  async function find(query: any): Promise<T[]> {
    return model.find(query).exec();
  }

  async function update(id: string | ObjectId, data: any): Promise<T | null> {
    const doc = await model.findById(id).exec();
    if (!doc) {
      return null;
    }
    Object.assign(doc, data);
    await doc.save();
    return doc;
  }

  async function deleteById(id: string | ObjectId): Promise<boolean> {
    const result = await model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }

  return {
    create,
    findById,
    findOne,
    find,
    update,
    delete: deleteById,
  };
}