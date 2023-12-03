const { query } = require('../db');

async function handleCoursesIdEnroll(req, res) {
  try {
    const userId = req.body.userId; 
    const courseId = req.params.courseId;

    // Check if the user is already enrolled in the course
    const existingEnrollmentSql = 'SELECT UserCourseID FROM usercourses WHERE UserID = ? AND CourseID = ?';
    const [existingEnrollmentResult] = await query(existingEnrollmentSql, [userId, courseId]);

    // Check if the enrollment already exists
    if (existingEnrollmentResult && existingEnrollmentResult.length > 0) {
      return res.status(400).json({ error: 'User is already enrolled in the course' });
    }

    // Enroll the user in the course
    const enrollSql = 'INSERT INTO usercourses (UserID, CourseID) VALUES (?, ?)';
    await query(enrollSql, [userId, courseId]);

    res.json({ message: 'User enrolled in the course successfully' });
  } catch (error) {
    console.error('Error enrolling user in course:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  handleCoursesIdEnroll,
};
