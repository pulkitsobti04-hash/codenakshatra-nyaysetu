const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { DATA_DIR, DB_PATH, SCHEMA_PATH } = require('../config/database');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function initializeDatabase() {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('PRAGMA foreign_keys = ON');
      db.exec(schema, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });
}

function closeDatabase(callback) {
  db.close(callback);
}

module.exports = {
  all,
  closeDatabase,
  DB_PATH,
  get,
  initializeDatabase,
  run
};
