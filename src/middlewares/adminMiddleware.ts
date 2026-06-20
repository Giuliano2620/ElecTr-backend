import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado' });
  }
}