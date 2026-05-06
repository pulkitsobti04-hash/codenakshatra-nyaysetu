-- NyaySetu SQLite schema
-- This file is used by backend/server.js.
-- Foreign key enforcement is enabled by the server when the app starts.

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(30),
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  college VARCHAR(180),
  year_of_study VARCHAR(80),
  interest_area VARCHAR(120),
  enrollment_no VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (role IN ('student', 'user'))
);

CREATE TABLE IF NOT EXISTS lawyers (
  id INTEGER PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(30) NOT NULL,
  qualification VARCHAR(180) NOT NULL,
  specialization VARCHAR(120) NOT NULL,
  experience INTEGER NOT NULL DEFAULT 0,
  location VARCHAR(120) NOT NULL,
  fees VARCHAR(80) NOT NULL,
  bio TEXT,
  certificate_file VARCHAR(255),
  is_verified INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (experience >= 0),
  CHECK (is_verified IN (0, 1))
);

CREATE TABLE IF NOT EXISTS cases (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  problem_text TEXT NOT NULL,
  category VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  lawyer_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  review_text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (rating >= 1 AND rating <= 5),
  FOREIGN KEY (lawyer_id) REFERENCES lawyers (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
