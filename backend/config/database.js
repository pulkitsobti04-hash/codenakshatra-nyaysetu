const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'nyaysetu.sqlite');
const SCHEMA_PATH = path.join(__dirname, '..', '..', 'database', 'schema.sql');

module.exports = {
  DATA_DIR,
  DB_PATH,
  SCHEMA_PATH
};
