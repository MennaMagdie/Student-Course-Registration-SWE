// Admin authentication routes
const express = require('express');
const router = express.Router();
const db = require('./db');

// POST /admin-login - Admin email and password login
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get admin from database
    const [rows] = await db.query(
      'SELECT * FROM admins WHERE email = ? AND password = ?',
      [email, password]
    );

    // Check if admin exists
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Store admin info in session
    req.session.adminId = rows[0].id;
    req.session.adminName = rows[0].name;
    req.session.adminEmail = rows[0].email;
    req.session.isAdmin = true;

    res.json({
      success: true,
      message: 'Admin login successful',
      adminId: rows[0].id,
      name: rows[0].name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /admin-logout - Clear admin session
router.post('/admin-logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;
