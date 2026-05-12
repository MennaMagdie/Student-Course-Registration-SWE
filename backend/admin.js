// Admin routes
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET /students - Get all students
router.get('/students', async (req, res) => {
  try {
    const [students] = await db.query('SELECT id, student_id, name, email FROM students');
    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /add-student - Add a new student
router.post('/add-student', async (req, res) => {
  try {
    const { student_id, name, email, phone, address, password } = req.body;

    await db.query(
      'INSERT INTO students (student_id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)',
      [student_id, name, email, phone, address, password]
    );

    res.json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, message: 'Student ID or email already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

// DELETE /delete-student/:id - Delete a student
router.delete('/delete-student/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    const result = await db.query('DELETE FROM students WHERE id = ?', [studentId]);

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /add-course - Add a new course
router.post('/add-course', async (req, res) => {
  try {
    const { course_name, instructor, lecture_time } = req.body;

    await db.query(
      'INSERT INTO courses (course_name, instructor, lecture_time) VALUES (?, ?, ?)',
      [course_name, instructor, lecture_time]
    );

    res.json({ success: true, message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /delete-course/:id - Delete a course
router.delete('/delete-course/:id', async (req, res) => {
  try {
    const courseId = req.params.id;

    const result = await db.query('DELETE FROM courses WHERE id = ?', [courseId]);

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /upload-grade - Upload or update grades for a student
router.post('/upload-grade', async (req, res) => {
  try {
    const { student_id, course_id, grade, exam_score } = req.body;

    const [existing] = await db.query(
      'SELECT * FROM grades WHERE student_id = ? AND course_id = ?',
      [student_id, course_id]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE grades SET grade = ?, exam_score = ? WHERE student_id = ? AND course_id = ?',
        [grade, exam_score, student_id, course_id]
      );
    } else {
      await db.query(
        'INSERT INTO grades (student_id, course_id, grade, exam_score) VALUES (?, ?, ?, ?)',
        [student_id, course_id, grade, exam_score]
      );
    }

    res.json({ success: true, message: 'Grade uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
