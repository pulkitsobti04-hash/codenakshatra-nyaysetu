const db = require('../models/db');
const { cleanText, handleDatabaseError, isEmail, requestBody, requireFields } = require('./helpers');

async function registerLawyer(req, res) {
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

    const result = await db.run(
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

    const lawyer = await db.get('SELECT * FROM lawyers WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Lawyer profile submitted successfully.', lawyer });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

async function listLawyers(req, res) {
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
    const lawyers = await db.all(
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
}

module.exports = {
  listLawyers,
  registerLawyer
};
