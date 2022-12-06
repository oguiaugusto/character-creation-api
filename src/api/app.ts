import express from 'express';

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
      res.status(200).json({ message: 'Server Online!' })
    ));
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

export default App;
