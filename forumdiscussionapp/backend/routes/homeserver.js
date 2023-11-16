const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { accessToken, verifyJwt } = require('../authvalid');

router.post('/enroll-courses',  async (req, res) => {
  const { courses } = req.body;
  const userId = req.userId;

  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    for (const courseId of courses) {
      const sql = 'INSERT INTO usercourses (UserID, CourseID) VALUES (?, ?)';
      const [result] = await query(sql, [userId, courseId]);

      if (result.affectedRows !== 1) {
        return res.status(500).json({ error: 'Failed to enroll in some courses' });
      }
    }

    res.json({ success: true, message: 'Enrollment successful' });
  } catch (error) {
    console.error('Error enrolling in courses:', error);
    res.status(500).json({ error: 'Enrollment failed' });
  }
});

router.post('/refresh-token', verifyJwt, async (req, res) => {
  try {
    const newAccessToken = accessToken(req.user); 

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error('Token refresh failed:', error);
    res.status(401).json({ error: 'Token refresh failed' });
  }
});

module.exports = router;
