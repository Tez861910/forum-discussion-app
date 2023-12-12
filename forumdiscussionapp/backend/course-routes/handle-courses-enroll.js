const { query } = require('../db');

async function handleCoursesEnroll(req, res) {
  try {
    const userId = req.body.userId; 
    const courseIds = req.body.courseIds; 

    // Check if any user is already enrolled in any of the selected courses
    const existingEnrollmentSql = 'SELECT UserCourseID FROM usercourses WHERE UserID = ? AND CourseID IN (?)';
    const [existingEnrollmentResult] = await query(existingEnrollmentSql, [userId, courseIds]);

    // Check if any user is already enrolled in any of the selected courses
    if (existingEnrollmentResult && existingEnrollmentResult.length > 0) {
      return res.status(400).json({ error: 'The user is already enrolled in one or more selected courses' });
    }

    // Enroll the user in all selected courses
    const enrollSql = 'INSERT INTO usercourses (UserID, CourseID) VALUES ?';
    const enrollValues = courseIds.map(courseId => [userId, courseId]);
    await query(enrollSql, [enrollValues]);

    res.json({ message: 'User enrolled in the selected courses successfully' });
  } catch (error) {
    console.error('Error enrolling user in courses:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  handleCoursesEnroll,
};
