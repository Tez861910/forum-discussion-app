const { query } = require('../db');

async function handleCoursesIdEnroll(req, res) {
  try {
    const userIds = req.body.userIds; 
    const courseId = req.params.courseId;

    // Check if the enrollment already exists for any user
    const existingEnrollmentSql = 'SELECT UserCourseID FROM usercourses WHERE UserID IN (?) AND CourseID = ?';
    const [existingEnrollmentResult] = await query(existingEnrollmentSql, [userIds, courseId]);

    // Check if any user is already enrolled in the course
    if (existingEnrollmentResult && existingEnrollmentResult.length > 0) {
      return res.status(400).json({ error: 'One or more users are already enrolled in the course' });
    }

    // Enroll all users in the course
    const enrollSql = 'INSERT INTO usercourses (UserID, CourseID) VALUES ?';
    const enrollValues = userIds.map(userId => [userId, courseId]);
    await query(enrollSql, [enrollValues]);

    res.json({ message: 'Users enrolled in the course successfully' });
  } catch (error) {
    console.error('Error enrolling users in course:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  handleCoursesIdEnroll,
};
