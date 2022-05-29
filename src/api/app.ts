import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import errorMiddleware from '../middlewares/error';
import router from '../routes';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: 'Hello!' });
});
app.use(router);

app.use(cors());

app.use(errorMiddleware);

export default app;
