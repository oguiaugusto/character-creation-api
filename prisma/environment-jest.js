const NodeEnvironment = require('jest-environment-node').default;
const dotenv = require('dotenv');
const { execSync } = require('child_process');
const { randomUUID } = require('crypto');
const { resolve } = require('path');
const { Client } = require('pg');

const prismaCli = './node_modules/.bin/prisma';

dotenv.config({
  path: resolve(__dirname, '..', '.env.test'),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `schema-${randomUUID()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    execSync(`${prismaCli} migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE;`);

    client.end();
  }
}

module.exports = CustomEnvironment;
