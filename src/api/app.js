require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middlewares/error');

const routes = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res
  .status(200)
  .json({ message: 'Hello!', environment: process.env.NODE_ENV }));
app.use(routes);

app.use(errorMiddleware);

module.exports = app;
