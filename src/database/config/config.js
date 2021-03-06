require('dotenv/config');

const {
  HOST,
  DB_PASSWORD,
  DATABASE,
  DB_USERNAME,
  DB_PORT,
  DEV_HOST,
  DEV_DB_PASSWORD,
  DEV_DATABASE,
  DEV_DB_USERNAME,
  DEV_DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DATABASE,
    host: DEV_HOST,
    port: DEV_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
};
