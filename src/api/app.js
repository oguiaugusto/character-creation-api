const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'Hello!' }));

app.use(cors());

module.exports = app;
