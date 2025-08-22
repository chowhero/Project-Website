require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Authentication middleware
const authenticateStaff = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    // Verify token (you'll need to implement JWT or your auth system)
    const decoded = {}; // Replace with actual token verification
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.use('/api/announcements', require('./routes/announcements')(pool));
app.use('/api/jobs', require('./routes/jobs')(pool));
app.use('/api/staff', require('./routes/staff')(pool));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});