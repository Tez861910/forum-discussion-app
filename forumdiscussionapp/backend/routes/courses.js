const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Create a new course
router.post('/', (req, res) => {
  const { courseName } = req.body;

  const sql = 'INSERT INTO courses (CourseName) VALUES (?)';

  db.query(sql, [courseName], (err, result) => {
    if (err) {
      console.error('Error creating course:', err);
      return res.status(500).json({ error: 'Course creation failed' });
    }
    res.json({ message: 'Course created successfully', courseId: result.insertId });
  });
});

// Get a list of all courses
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM courses';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ error: 'Error fetching courses' });
    }
    res.json(results);
  });
});

// Update a course by ID
router.put('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const { courseName } = req.body;
  const sql = 'UPDATE courses SET CourseName = ? WHERE CourseID = ?';

  db.query(sql, [courseName, courseId], (err, result) => {
    if (err) {
      console.error('Error updating course:', err);
      return res.status(500).json({ error: 'Course update failed' });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Course not found' });
    } else {
      res.json({ message: 'Course updated successfully' });
    }
  });
});

// Delete a course by ID
router.delete('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const sql = 'DELETE FROM courses WHERE CourseID = ?';

  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error('Error deleting course:', err);
      return res.status(500).json({ error: 'Course deletion failed' });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Course not found' });
    } else {
      res.json({ message: 'Course deleted successfully' });
    }
  });
});

module.exports = router;
