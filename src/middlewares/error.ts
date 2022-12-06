import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Messages, RequestError } from '../utils';

type ErrType = RequestError;

class ErrorMiddleware {
  static handle = (err: ErrType, _req: Request, res: Response, _next: NextFunction) => {
    let status = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = Messages.INTERNAL_SERVER_ERROR;

    if (err instanceof RequestError) {
      status = err.status;
      message = err.message;
    }

    return res.status(status).json({ message });
  };
}

export default ErrorMiddleware;
