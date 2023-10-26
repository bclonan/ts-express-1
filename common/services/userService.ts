import { UserModel } from '../models/userModel';
import { IUser } from '../types';
import { mongooseAdapter } from '../adapters/mongooseAdapter';

export class UserService {
  private userModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.userModel = mongooseAdapter(UserModel);
  }

  async createUser(user: IUser): Promise<IUser> {
    const createdUser = await this.userModel.create(user);
    return createdUser.toObject();
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findById(id);
    return user ? user.toObject() : null;
  }

  async updateUser(id: string, user: IUser): Promise<IUser | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
    return updatedUser ? updatedUser.toObject() : null;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}