const db = require('../models/db');
const { cleanText, handleDatabaseError, requestBody } = require('./helpers');

async function saveQuery(req, res) {
  try {
    const body = requestBody(req);
    const userId = Number(body.user_id);
    const problemText = cleanText(body.problem_text);
    const category = cleanText(body.category || 'General');

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'A valid user_id is required.' });
    }

    if (!problemText) {
      return res.status(400).json({ error: 'problem_text is required.' });
    }

    const result = await db.run(
      'INSERT INTO cases (user_id, problem_text, category) VALUES (?, ?, ?)',
      [userId, problemText, category]
    );

    const query = await db.get('SELECT * FROM cases WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Query saved successfully.', query });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

async function listQueries(req, res) {
  try {
    const userId = Number(req.query.user_id);
    const filters = [];
    const params = [];

    if (req.query.user_id !== undefined) {
      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: 'user_id must be a positive number.' });
      }

      filters.push('cases.user_id = ?');
      params.push(userId);
    }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const queries = await db.all(
      `SELECT cases.id, cases.user_id, users.name AS user_name, users.email AS user_email,
              cases.problem_text, cases.category, cases.created_at
       FROM cases
       JOIN users ON users.id = cases.user_id
       ${where}
       ORDER BY cases.created_at DESC`,
      params
    );

    return res.json({ queries });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

module.exports = {
  listQueries,
  saveQuery
};
