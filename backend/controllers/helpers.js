function cleanText(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanText(value));
}

function requireFields(body, fields) {
  return fields.filter((field) => !cleanText(body[field]));
}

function requestBody(req) {
  return req.body && typeof req.body === 'object' ? req.body : {};
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

module.exports = {
  cleanText,
  handleDatabaseError,
  isEmail,
  requestBody,
  requireFields
};
