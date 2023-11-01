const express = require('express');
const router = express.Router();
const { query } = require('../db');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Create a new course
router.post('/courses/create', async (req, res) => {
  const { courseName } = req.body;

  try {
    if (!courseName) {
      console.log('Course name is required');
      return res.status(400).json({ error: 'Course name is required' });
    }

    const sql = 'INSERT INTO courses (CourseName) VALUES (?)';
    const [result] = await query(sql, [courseName]);

    if (result.affectedRows === 1) {
      console.log('Course created successfully');
      res.json({ message: 'Course created successfully' });
    } else {
      console.error('Course creation failed');
      res.status(500).json({ error: 'Course creation failed' });
    }
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Course creation failed', details: error.message });
  }
});

// Get all courses
router.get('/courses/get', async (req, res) => {
  try {
    const sql = 'SELECT * FROM courses';
    const results = await query(sql);

    console.log(results)

    if (!results.length) {
      // console.error('No courses found in the database');
      return res.status(404).json({ error: 'No courses found' });
    }

    const courseData = results.map(row => ({
      CourseID: row.CourseID,
      CourseName: row.CourseName,
    }));

    console.log('Courses fetched successfully');
    res.status(200).json({ courses: results });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Course retrieval failed', details: error.message });
  }
});

// Get a course by ID
router.get('/courses/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'SELECT * FROM courses WHERE CourseID = ?';
    const [result] = await query(sql, [id]);

    if (result.length === 1) {
      console.log('Course fetched successfully');
      res.json({ course: result[0] });
    } else {
      console.error('Course not found');
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Course retrieval failed', details: error.message });
  }
});

// Update a course by ID
router.put('/courses/update/:id', async (req, res) => {
  const { id } = req.params;
  const { courseName } = req.body;

  try {
    if (!courseName) {
      console.log('Course name is required');
      return res.status(400).json({ error: 'Course name is required' });
    }

    const sql = 'UPDATE courses SET CourseName = ? WHERE CourseID = ?';
    const [result] = await query(sql, [courseName, id]);

    if (result.affectedRows === 1) {
      console.log('Course updated successfully');
      res.json({ message: 'Course updated successfully' });
    } else {
      console.error('Course update failed');
      res.status(500).json({ error: 'Course update failed' });
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Course update failed', details: error.message });
  }
});

// Delete a course by ID
router.delete('/courses/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'DELETE FROM courses WHERE CourseID = ?';
    const [result] = await query(sql, [id]);

    if (result.affectedRows === 1) {
      console.log('Course deleted successfully');
      res.json({ message: 'Course deleted successfully' });
    } else {
      console.error('Course deletion failed');
      res.status(500).json({ error: 'Course deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Course deletion failed', details: error.message });
  }
});

module.exports = router;
