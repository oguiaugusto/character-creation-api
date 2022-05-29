import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestError } from '../utils';

type ErrType = RequestError | CelebrateError;
type CelebrateMessage = { message: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(err: ErrType, _req: Request, res: Response, _next: NextFunction) {
  let status = 500;
  let message = 'Internal Server Error';

  if (isCelebrateError(err)) {
    const { message: celebrateMessage }: CelebrateMessage = err
      .details.entries().next().value[1].details[0];
    message = celebrateMessage;

    status = StatusCodes.BAD_REQUEST;
  }
  if (err instanceof RequestError) {
    status = err.status;
    message = err.message;
  }
  if (err.name === 'JsonWebTokenError') {
    status = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token';
  }
  if (status === 500) {
    message = 'Internal Server Error';
  }

  return res.status(status).json({ message });
}

export default errorMiddleware;
