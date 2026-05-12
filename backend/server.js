// Main Express server file
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

// Import route files
const authRoutes = require('./auth');
const studentRoutes = require('./student');
const adminRoutes = require('./admin');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'university_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/', authRoutes);
app.use('/', studentRoutes);
app.use('/', adminRoutes);

// Root route - serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Make sure MySQL is running and database is imported!');
});
