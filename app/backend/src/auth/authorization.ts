import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';

const secret: string = process.env.JWT_SECRET || 'senha super segura';

const createToken = (data: User) => jwt.sign({ data }, secret, { algorithm: 'HS256', expiresIn: '10d' });

const verifyToken = (token: string) => jwt.verify(token, secret);

export { createToken, verifyToken };