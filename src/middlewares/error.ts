import { NextFunction, Request, Response } from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { Messages, RequestError } from '../utils';

type ErrType = RequestError | CelebrateError;

class ErrorMiddleware {
  private static getCelebrateValues(err: CelebrateError) {
    const { message } = err
      .details.entries().next().value[1].details[0];
    const status = message.includes('must ')
      ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.BAD_REQUEST;

    return { message, status };
  }

  public static handle = (err: ErrType, _req: Request, res: Response, _next: NextFunction) => {
    let status = StatusCodes.INTERNAL_SERVER_ERROR;
    let message: Messages | string = Messages.INTERNAL_SERVER_ERROR;

    if (isCelebrateError(err)) {
      const { message: celMessage, status: celStatus } = ErrorMiddleware.getCelebrateValues(err);
      status = celStatus;
      message = celMessage;
    }

    if (err instanceof JsonWebTokenError) {
      status = StatusCodes.UNAUTHORIZED;
      message = Messages.INVALID_TOKEN;
    }

    if (err instanceof TokenExpiredError) {
      status = StatusCodes.UNAUTHORIZED;
      message = Messages.TOKEN_EXPIRED;
    }

    if (err instanceof RequestError) {
      status = err.status;
      message = err.message;
    }

    return res.status(status).json({ message });
  };
}

export default ErrorMiddleware;
