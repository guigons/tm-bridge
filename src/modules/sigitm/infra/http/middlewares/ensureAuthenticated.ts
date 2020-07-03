import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('bridge secret is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  if (authConfig.bridge_secret !== token) {
    throw new AppError('invalid bridge secret', 401);
  }

  return next();
}
