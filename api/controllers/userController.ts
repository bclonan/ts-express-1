import { Request, Response } from 'express';
import { UserService } from '../../common/services/userService';
import { User } from '../../common/types';
import { MongooseAdapter } from '../../common/adapters/mongooseAdapter';

const mongooseAdapter = new MongooseAdapter();

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(mongooseAdapter);
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await this.userService.getUser(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}