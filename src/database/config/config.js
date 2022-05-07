require('dotenv/config');

const { HOST, DB_PASSWORD, DATABASE, DB_USERNAME, DB_PORT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres'
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres'
  }
}
