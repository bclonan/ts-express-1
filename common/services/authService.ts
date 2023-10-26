import { AuthModel } from '../models/authModel';
import { mongooseAdapter } from '../adapters/mongooseAdapter';

export class AuthService {
  private readonly authModel = mongooseAdapter(AuthModel);

  async createToken(userId: string): Promise<string> {
    const token = await this.authModel.create({ userId });
    return token._id;
  }

  async verifyToken(tokenId: string): Promise<boolean> {
    const token = await this.authModel.findById(tokenId);
    return !!token;
  }

  async deleteToken(tokenId: string): Promise<void> {
    await this.authModel.findByIdAndDelete(tokenId);
  }
}