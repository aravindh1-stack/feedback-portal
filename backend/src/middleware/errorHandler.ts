import { NextFunction, Request, Response } from 'express';

export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.originalUrl} not found` } });
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  res.status(status).json({ error: { code: 'ERROR', message, details } });
};
