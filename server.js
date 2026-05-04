const express = require('express');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'nyaysetu.sqlite');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

const db = new sqlite3.Database(DB_PATH);

function cleanText(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanText(value));
}

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

function handleDatabaseError(res, error) {
  if (error.code === 'SQLITE_CONSTRAINT') {
    if (error.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    return res.status(400).json({ error: 'Invalid related user, lawyer, or field value.' });
  }

  console.error(error);
  return res.status(500).json({ error: 'Database error. Please try again.' });
}

function requireFields(body, fields) {
  return fields.filter((field) => !cleanText(body[field]));
}

function requestBody(req) {
  return req.body && typeof req.body === 'object' ? req.body : {};
}

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  return next(error);
});

app.get('/', (req, res) => {
  res.json({
    message: 'NyaySetu backend is running.',
    health: '/api/health',
    docs: 'See README.md for API examples.'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'NyaySetu API',
    database: DB_PATH
  });
});

app.post('/api/users', async (req, res) => {
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

    const result = await run(
      `INSERT INTO users
        (name, email, phone, role, college, year_of_study, interest_area, enrollment_no)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, role, college, yearOfStudy, interestArea, enrollmentNo]
    );

    const user = await get('SELECT * FROM users WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
});

app.get('/api/users', async (req, res) => {
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

    const users = await all(
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
});

app.post('/api/lawyers', async (req, res) => {
  try {
    const reqBody = requestBody(req);
    const experienceText = cleanText(reqBody.experience);
    const body = {
      name: cleanText(reqBody.name),
      email: cleanText(reqBody.email).toLowerCase(),
      phone: cleanText(reqBody.phone),
      qualification: cleanText(reqBody.qualification),
      specialization: cleanText(reqBody.specialization),
      experience: Number(experienceText),
      location: cleanText(reqBody.location),
      fees: cleanText(reqBody.fees),
      bio: cleanText(reqBody.bio),
      certificate_file: cleanText(reqBody.certificate_file)
    };

    const missing = requireFields({ ...body, experience: experienceText }, [
      'name',
      'email',
      'phone',
      'qualification',
      'specialization',
      'experience',
      'location',
      'fees'
    ]);

    if (missing.length) {
      return res.status(400).json({ error: `Missing required field: ${missing[0]}` });
    }

    if (!isEmail(body.email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!Number.isInteger(body.experience) || body.experience < 0) {
      return res.status(400).json({ error: 'Experience must be a whole number of years.' });
    }

    const result = await run(
      `INSERT INTO lawyers
        (name, email, phone, qualification, specialization, experience, location, fees, bio, certificate_file)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.name,
        body.email,
        body.phone,
        body.qualification,
        body.specialization,
        body.experience,
        body.location,
        body.fees,
        body.bio,
        body.certificate_file
      ]
    );

    const lawyer = await get('SELECT * FROM lawyers WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Lawyer profile submitted successfully.', lawyer });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
});

app.get('/api/lawyers', async (req, res) => {
  try {
    const specialization = cleanText(req.query.specialization);
    const location = cleanText(req.query.location);
    const filters = [];
    const params = [];

    if (specialization) {
      filters.push('LOWER(specialization) LIKE ?');
      params.push(`%${specialization.toLowerCase()}%`);
    }

    if (location) {
      filters.push('LOWER(location) LIKE ?');
      params.push(`%${location.toLowerCase()}%`);
    }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const lawyers = await all(
      `SELECT id, name, email, phone, qualification, specialization, experience,
              location, fees, bio, is_verified, created_at
       FROM lawyers
       ${where}
       ORDER BY created_at DESC`,
      params
    );

    return res.json({ lawyers });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
});

app.post('/api/queries', async (req, res) => {
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

    const result = await run(
      'INSERT INTO cases (user_id, problem_text, category) VALUES (?, ?, ?)',
      [userId, problemText, category]
    );

    const query = await get('SELECT * FROM cases WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Query saved successfully.', query });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
});

app.get('/api/queries', async (req, res) => {
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
    const queries = await all(
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
});

app.post('/api/reviews', async (req, res) => {
  try {
    const body = requestBody(req);
    const lawyerId = Number(body.lawyer_id);
    const userId = Number(body.user_id);
    const rating = Number(body.rating);
    const reviewText = cleanText(body.review_text);

    if (!Number.isInteger(lawyerId) || lawyerId <= 0) {
      return res.status(400).json({ error: 'A valid lawyer_id is required.' });
    }

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'A valid user_id is required.' });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const result = await run(
      'INSERT INTO reviews (lawyer_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)',
      [lawyerId, userId, rating, reviewText]
    );

    const review = await get('SELECT * FROM reviews WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Review submitted successfully.', review });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const lawyerId = Number(req.query.lawyer_id);
    const filters = [];
    const params = [];

    if (req.query.lawyer_id !== undefined) {
      if (!Number.isInteger(lawyerId) || lawyerId <= 0) {
        return res.status(400).json({ error: 'lawyer_id must be a positive number.' });
      }

      filters.push('reviews.lawyer_id = ?');
      params.push(lawyerId);
    }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const reviews = await all(
      `SELECT reviews.id, reviews.lawyer_id, lawyers.name AS lawyer_name,
              reviews.user_id, users.name AS user_name, reviews.rating,
              reviews.review_text, reviews.created_at
       FROM reviews
       JOIN lawyers ON lawyers.id = reviews.lawyer_id
       JOIN users ON users.id = reviews.user_id
       ${where}
       ORDER BY reviews.created_at DESC`,
      params
    );

    return res.json({ reviews });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
});

function startServer() {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');

  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');
    db.exec(schema, (error) => {
      if (error) {
        console.error('Could not initialize database:', error.message);
        process.exit(1);
      }

      app.listen(PORT, () => {
        console.log(`NyaySetu API running on http://localhost:${PORT}`);
        console.log(`SQLite database: ${DB_PATH}`);
      });
    });
  });
}

process.on('SIGINT', () => {
  db.close(() => {
    process.exit(0);
  });
});

startServer();
