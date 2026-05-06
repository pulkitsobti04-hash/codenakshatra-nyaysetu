const { DB_PATH } = require('../models/db');

function root(req, res) {
  res.json({
    message: 'NyaySetu backend is running.',
    health: '/api/health',
    docs: 'See README.md for API examples.'
  });
}

function health(req, res) {
  res.json({
    ok: true,
    service: 'NyaySetu API',
    database: DB_PATH
  });
}

module.exports = {
  health,
  root
};
