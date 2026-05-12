// Authentication routes
const express = require('express');
const router = express.Router();
const db = require('./db');

// POST /login - Login using student_id and password
router.post('/login', async (req, res) => {
  try {
    const { student_id, password } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM students WHERE student_id = ? AND password = ?',
      [student_id, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid Student ID or password' });
    }

    req.session.studentId = rows[0].id;
    req.session.studentName = rows[0].name;
    req.session.studentEmail = rows[0].email;

    res.json({
      success: true,
      message: 'Login successful',
      studentId: rows[0].id,
      studentUid: rows[0].student_id,
      name: rows[0].name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /signup - Register new student account
router.post('/signup', async (req, res) => {
  try {
    const { student_id, name, email, phone, address, password } = req.body;

    await db.query(
      'INSERT INTO students (student_id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)',
      [student_id, name, email, phone, address, password]
    );

    res.json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, message: 'Student ID or email already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
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
