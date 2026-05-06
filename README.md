# NyaySetu

NyaySetu is a beginner-friendly legal access web project for India. It includes a frontend demo for legal questions, document generation, legal text simplification, student review workflows, and lawyer discovery. It also includes a simple Node.js, Express, and SQLite backend for storing users, lawyers, legal queries, and reviews.

## Live Demo

```text
https://pulkitsobti04-hash.github.io/codenakshatra-nyaysetu/
```

## Folder Structure

```text
NyaySetu/
|-- Frontend/
|   |-- index.html
|   |-- pages/
|   |-- assets/
|       |-- css/
|       |   `-- styles.css
|       |-- js/
|       |   |-- app.js
|       |   `-- translations.js
|       |-- images/
|       `-- fonts/
|-- backend/
|   |-- server.js
|   |-- routes/
|   |-- controllers/
|   |-- models/
|   `-- config/
|-- database/
|   `-- schema.sql
|-- index.html
|-- README.md
|-- package.json
`-- .gitignore
```

## What Was Cleaned

- Main frontend file moved to `Frontend/index.html`.
- CSS moved to `Frontend/assets/css/styles.css`.
- JavaScript moved to `Frontend/assets/js/app.js`.
- Translation file moved to `Frontend/assets/js/translations.js`.
- Root `index.html` opens the frontend for GitHub Pages.
- SQL schema moved to `database/schema.sql`.
- Backend code organized into `routes`, `controllers`, `models`, and `config`.
- Duplicate root files were removed, including old root HTML, old `css/`, old `js/`, and duplicate backend package files.

## Frontend

Open this file in a browser:

```text
Frontend/index.html
```

The frontend is still a static HTML, CSS, and JavaScript app. It keeps the existing NyaySetu UI and features.

## Backend

The backend uses:

- Node.js
- Express
- SQLite

Install dependencies from the project root:

```bash
npm install
```

Start the backend:

```bash
npm start
```

The API runs at:

```text
http://localhost:5000/api
```

The SQLite database file is created automatically at:

```text
backend/data/nyaysetu.sqlite
```

## API Routes

```text
GET  /api/health       Check server and database status
POST /api/users        Register a general user or student
GET  /api/users        Fetch registered users
POST /api/lawyers      Register a lawyer profile
GET  /api/lawyers      Fetch lawyers
POST /api/queries      Save a legal query
GET  /api/queries      Fetch saved queries
POST /api/reviews      Submit a lawyer review
GET  /api/reviews      Fetch submitted reviews
```

## Database

The SQL schema is stored in:

```text
database/schema.sql
```

It creates these tables:

- `users`
- `lawyers`
- `cases`
- `reviews`

## Example Requests

Register a student or general user:

```js
fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Asha Sharma',
    email: 'asha@example.com',
    phone: '+91 98765 43210',
    role: 'student'
  })
});
```

Register a lawyer:

```js
fetch('http://localhost:5000/api/lawyers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Adv. Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    qualification: 'LLB',
    specialization: 'Criminal Law',
    experience: 8,
    location: 'Delhi',
    fees: '1500',
    bio: 'Handles bail, FIR, and consultation matters.'
  })
});
```

Save a legal query:

```js
fetch('http://localhost:5000/api/queries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 1,
    problem_text: 'My landlord is not returning my security deposit.',
    category: 'Property'
  })
});
```

Submit a review:

```js
fetch('http://localhost:5000/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lawyer_id: 1,
    user_id: 1,
    rating: 5,
    review_text: 'Clear advice and fast response.'
  })
});
```

## Main Features

- AI-style legal question flow.
- Role-based get started page.
- Join as Student form.
- Join as Lawyer form.
- Lawyer dashboard and lead view.
- Document generator.
- Legal text simplifier.
- English/Hindi translation support.
- Dark and bright mode UI.
- Basic backend storage for users, lawyers, queries, and reviews.

## Notes

This is a project demo and learning build. NyaySetu is not a law firm, and the app does not provide official legal advice. Users should consult a qualified advocate for specific legal matters.
