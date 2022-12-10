import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import ErrorMiddleware from '../middlewares/error';
import router from '../routes';
import { Messages } from '../utils';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());

    this.routes();
  }

  private routes(): void {
    this.app.get('/', (_req, res) => (
      res.status(StatusCodes.OK).json({ message: Messages.SERVER_ONLINE })
    ));

    this.app.use(router);
    this.app.use(ErrorMiddleware.handle);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

export default App;
