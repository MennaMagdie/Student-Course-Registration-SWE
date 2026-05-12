// Student routes
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET /courses - Get all available courses
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await db.query('SELECT * FROM courses');
    res.json({ success: true, courses: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /register-course - Register student for a course
router.post('/register-course', async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    // Check if already registered
    const [existing] = await db.query(
      'SELECT * FROM registrations WHERE student_id = ? AND course_id = ?',
      [student_id, course_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Already registered for this course' });
    }

    // Register course
    await db.query(
      'INSERT INTO registrations (student_id, course_id) VALUES (?, ?)',
      [student_id, course_id]
    );

    res.json({ success: true, message: 'Course registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /student-courses/:id - Get all courses registered by a student
router.get('/student-courses/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    const [courses] = await db.query(
      'SELECT c.* FROM courses c JOIN registrations r ON c.id = r.course_id WHERE r.student_id = ?',
      [studentId]
    );

    res.json({ success: true, courses: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /grades/:id - Get grades for a student
router.get('/grades/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    const [grades] = await db.query(
      'SELECT g.*, c.course_name FROM grades g JOIN courses c ON g.course_id = c.id WHERE g.student_id = ?',
      [studentId]
    );

    res.json({ success: true, grades: grades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /student-info/:id - Get student personal information
router.get('/student-info/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    const [student] = await db.query(
      'SELECT id, student_id, name, email, phone, address FROM students WHERE id = ?',
      [studentId]
    );

    if (student.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, student: student[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
