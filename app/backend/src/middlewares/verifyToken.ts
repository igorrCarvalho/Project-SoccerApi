import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/authorization';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = verifyToken(authorization);
    req.body.data = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
