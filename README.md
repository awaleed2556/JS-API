# JS-API

A RESTful API built with Node.js and Express for managing academic data including faculty information, semesters, and grading criteria.

**Live Demo:** [https://newbot-kingrek.vercel.app](https://newbot-kingrek.vercel.app)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [License](#license)

## 🎯 Overview

JS-API is a backend service designed to provide academic data through REST endpoints. It manages information about years, semesters, faculty members, and grading criteria, utilizing a PostgreSQL database for persistent data storage.

## ✨ Features

- **RESTful API endpoints** for querying academic data
- **CORS support** with configurable allowed origins
- **PostgreSQL database** integration via Neon Database
- **JSON responses** for easy integration with frontend applications
- **Error handling** and proper HTTP status codes
- **Static file serving** for frontend assets
- **Development mode** with file watching

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js v5.1.0
- **Database:** PostgreSQL (via Neon Serverless)
- **CORS:** Express CORS middleware
- **Database Driver:** @neondatabase/serverless

### Language Composition
- **JavaScript:** 64%
- **HTML:** 26.2%
- **CSS:** 9.8%

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/awaleed2556/JS-API.git
   cd JS-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add your database connection string and port (see [Environment Variables](#environment-variables))

4. **Start the server:**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:8080`

## 🚀 Usage

### Running the Server

**Production mode:**
```bash
npm start
```

**Development mode (with file watching):**
```bash
npm run dev
```

### Making API Requests

Use any HTTP client (curl, Postman, axios, fetch, etc.) to interact with the API:

```bash
# Example: Get all years
curl http://localhost:8080/api/years

# Example: Get semesters for a specific year
curl http://localhost:8080/api/semesters/2024
```

## 📡 API Endpoints

### Get All Years
```
GET /api/years
```
Returns a list of all years available in the database.

**Response:**
```json
[
  { "year": 2023 },
  { "year": 2024 }
]
```

### Get Semesters by Year
```
GET /api/semesters/:year
```
Returns all semesters for a specific year.

**Parameters:**
- `year` (required): Academic year

**Response:**
```json
[
  { "semester": 1 },
  { "semester": 2 }
]
```

### Get Faculty by Year and Semester
```
GET /api/faculty/:year/:semester
```
Returns faculty members for a specific year and semester.

**Parameters:**
- `year` (required): Academic year
- `semester` (required): Semester number

**Response:**
```json
[
  { "name": "Dr. John Doe", "fid": 1 },
  { "name": "Prof. Jane Smith", "fid": 2 }
]
```

### Get Grading Criteria
```
GET /api/criteria/:year/:semster/:fid
```
Returns grading criteria/distribution for a specific faculty member.

**Parameters:**
- `year` (required): Academic year
- `semster` (required): Semester number
- `fid` (required): Faculty ID

**Response:**
```json
[
  { "gradeid": 1, "grade": "A", "total": 15 },
  { "gradeid": 2, "grade": "B", "total": 22 }
]
```

## 📁 Project Structure

```
JS-API/
├── index.js           # Main application entry point
├── db.js              # Database connection configuration
├── package.json       # Project dependencies and scripts
├── index.html         # Frontend HTML file
├── public/            # Static assets directory
├── routes/
│   └── index.js       # API route definitions
└── .gitignore         # Git ignore configuration
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

The application comes preconfigured with CORS allowed origins for specific Firebase domains:
- `https://bootloader-kernel-arch.firebaseapp.com`
- `https://bootloader-kernel-arch.web.app`

To add more origins, modify the `allowedOrigins` array in `index.js`.

## 👨‍💻 Development

### Adding New Routes

1. Create or modify routes in the `routes/index.js` file
2. Use the `sql` template literal from `db.js` for database queries
3. Return JSON responses with appropriate HTTP status codes

### Example Route:
```javascript
router.get('/example', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM table_name;`;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Database Queries

Database queries use Neon's SQL template literals for parameterized queries to prevent SQL injection:

```javascript
const result = await sql`
  SELECT * FROM table 
  WHERE id = ${userId} 
  AND status = ${status};
`;
```

## 📝 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Author

**Awaleed** - [@awaleed2556](https://github.com/awaleed2556)

---

**Last Updated:** July 2025
