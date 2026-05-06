const db = require('../models/db');
const { cleanText, handleDatabaseError, requestBody } = require('./helpers');

async function submitReview(req, res) {
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

    const result = await db.run(
      'INSERT INTO reviews (lawyer_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)',
      [lawyerId, userId, rating, reviewText]
    );

    const review = await db.get('SELECT * FROM reviews WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Review submitted successfully.', review });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

async function listReviews(req, res) {
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
    const reviews = await db.all(
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
}

module.exports = {
  listReviews,
  submitReview
};
