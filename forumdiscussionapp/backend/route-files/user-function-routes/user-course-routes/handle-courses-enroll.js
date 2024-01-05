const { query } = require('../../../db');

async function handleCoursesEnroll(req, res) {
  try {
    const userId = req.body.userId;
    const courseIds = req.body.courseIds;

    // Check if any user is already enrolled in any of the selected courses
    const existingEnrollmentSql = `
      SELECT UC.UserCourseID
      FROM UserCourses AS UC
      JOIN CommonAttributes AS CA_UC ON UC.CommonAttributeID = CA_UC.AttributeID
      WHERE UC.UserID = ? AND UC.CourseID IN (?) AND CA_UC.IsDeleted = FALSE
    `;

    const [existingEnrollmentResult] = await query(existingEnrollmentSql, [userId, courseIds]);

    // Check if any user is already enrolled in any of the selected courses
    if (existingEnrollmentResult && existingEnrollmentResult.length > 0) {
      return res.status(400).json({ error: 'The user is already enrolled in one or more selected courses' });
    }

    // Get the UserCoursesAttributeID for the new enrollments
    const userCoursesAttributeIdSql = 'SELECT AttributeID FROM CommonAttributes WHERE IsDeleted = FALSE LIMIT 1';
    const [userCoursesAttributeIdResult] = await query(userCoursesAttributeIdSql);

    if (!userCoursesAttributeIdResult || userCoursesAttributeIdResult.length === 0) {
      return res.status(500).json({ error: 'Failed to retrieve UserCoursesAttributeID' });
    }

    const userCoursesAttributeId = userCoursesAttributeIdResult[0].AttributeID;

    // Enroll the user in all selected courses using the new UserCoursesAttributeID
    const enrollSql = 'INSERT INTO UserCourses (UserID, CourseID, CommonAttributeID) VALUES ?';
    const enrollValues = courseIds.map(courseId => [userId, courseId, userCoursesAttributeId]);
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
