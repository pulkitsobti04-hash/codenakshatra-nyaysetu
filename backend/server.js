const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const lawyerRoutes = require('./routes/lawyerRoutes');
const queryRoutes = require('./routes/queryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const { closeDatabase, DB_PATH, initializeDatabase } = require('./models/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  console.error(error);
  return res.status(500).json({ error: 'Server error. Please try again.' });
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`NyaySetu API running on http://localhost:${PORT}`);
      console.log(`SQLite database: ${DB_PATH}`);
    });
  } catch (error) {
    console.error('Could not initialize database:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  closeDatabase(() => {
    process.exit(0);
  });
});

startServer();
