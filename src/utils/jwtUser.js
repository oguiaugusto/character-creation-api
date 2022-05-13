require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const jwtConfig = { expiresIn: '3d', algorithm: 'HS256' };

module.exports = {
  sign: (user) => (
    jwt.sign({ id: user.id, email: user.email, admin: user.admin }, JWT_SECRET, jwtConfig)
  ),
  verify: (token) => (
    jwt.verify(token, JWT_SECRET)
  ),
};
