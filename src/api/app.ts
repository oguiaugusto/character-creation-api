import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMiddleware from '../middlewares/error';
import router from '../routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());

    this.routes();
  }

  private routes(): void {
    this.app.get('/', (_req, res) => (
      res.status(StatusCodes.OK).json({ message: 'Server Online!' })
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
