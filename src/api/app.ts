import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: 'Hello!' });
});

app.use(cors());

export default app;
