import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

export const expressAdapter = (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      if (result instanceof Document) {
        res.json(result.toObject());
      } else {
        res.json(result);
      }
    } catch (error) {
      next(error);
    }
  };
};