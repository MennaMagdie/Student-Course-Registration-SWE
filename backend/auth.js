// Authentication routes
const express = require('express');
const router = express.Router();
const db = require('./db');

// POST /login - Simple email and password login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get student from database
    const [rows] = await db.query(
      'SELECT * FROM students WHERE email = ? AND password = ?',
      [email, password]
    );

    // Check if student exists
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Store student info in session
    req.session.studentId = rows[0].id;
    req.session.studentName = rows[0].name;
    req.session.studentEmail = rows[0].email;

    res.json({
      success: true,
      message: 'Login successful',
      studentId: rows[0].id,
      name: rows[0].name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /logout - Clear session
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
});

// GET /check-session - Check if student is logged in
router.get('/check-session', (req, res) => {
  if (req.session.studentId) {
    res.json({
      loggedIn: true,
      studentId: req.session.studentId,
      name: req.session.studentName
    });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
