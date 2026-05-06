import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authconfig } from "../../config/auth"

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authconfig.jwt.secret) as {
      userId: string;
    };

    (req as any).userId = decoded.userId;

    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}