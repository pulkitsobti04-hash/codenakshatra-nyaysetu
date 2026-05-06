const db = require('../models/db');
const { cleanText, handleDatabaseError, isEmail, requestBody, requireFields } = require('./helpers');

async function registerUser(req, res) {
  try {
    const body = requestBody(req);
    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanText(body.phone);
    const role = cleanText(body.role || 'user').toLowerCase();
    const college = cleanText(body.college);
    const yearOfStudy = cleanText(body.year_of_study);
    const interestArea = cleanText(body.interest_area);
    const enrollmentNo = cleanText(body.enrollment_no);

    const missing = requireFields({ name, email }, ['name', 'email']);
    if (missing.length) {
      return res.status(400).json({ error: `Missing required field: ${missing[0]}` });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!['student', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Role must be either student or user.' });
    }

    const result = await db.run(
      `INSERT INTO users
        (name, email, phone, role, college, year_of_study, interest_area, enrollment_no)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, role, college, yearOfStudy, interestArea, enrollmentNo]
    );

    const user = await db.get('SELECT * FROM users WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

async function listUsers(req, res) {
  try {
    const role = cleanText(req.query.role).toLowerCase();
    const params = [];
    let where = '';

    if (role) {
      if (!['student', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Role must be either student or user.' });
      }

      where = 'WHERE role = ?';
      params.push(role);
    }

    const users = await db.all(
      `SELECT id, name, email, phone, role, college, year_of_study,
              interest_area, enrollment_no, created_at
       FROM users
       ${where}
       ORDER BY created_at DESC`,
      params
    );

    return res.json({ users });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

module.exports = {
  listUsers,
  registerUser
};
