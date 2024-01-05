const { query } = require('../../../db');

async function handleCoursesIdEnroll(req, res) {
  try {
    const userIds = req.body.userIds; 
    const courseId = req.body.courseId; 

    // Check if any user is already enrolled in the selected course
    const existingEnrollmentSql = 'SELECT UserCourseID FROM usercourses ' +
      'INNER JOIN commonattributes ON usercourses.CommonAttributeID = commonattributes.AttributeID ' +
      'WHERE UserID IN (?) AND CourseID = ? AND commonattributes.IsDeleted = false';
    const [existingEnrollmentResult] = await query(existingEnrollmentSql, [userIds, courseId]);

    // Check if any user is already enrolled in the selected course
    if (existingEnrollmentResult && existingEnrollmentResult.length > 0) {
      return res.status(400).json({ error: 'One or more users are already enrolled in the selected course' });
    }

    // Get the CommonAttributeID for new enrollments
    const commonAttributeSql = 'SELECT AttributeID FROM commonattributes WHERE IsDeleted = false LIMIT 1';
    const [commonAttributeResult] = await query(commonAttributeSql);

    if (!commonAttributeResult || commonAttributeResult.length === 0) {
      return res.status(500).json({ error: 'No available CommonAttributeID for new enrollments' });
    }

    const commonAttributeId = commonAttributeResult[0].AttributeID;

    // Enroll the users in the selected course
    const enrollSql = 'INSERT INTO usercourses (UserID, CourseID, CommonAttributeID) VALUES ?';
    const enrollValues = userIds.map(userId => [userId, courseId, commonAttributeId]);
    await query(enrollSql, [enrollValues]);

    res.json({ message: 'Users enrolled in the selected course successfully' });
  } catch (error) {
    console.error('Error enrolling users in course:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  handleCoursesIdEnroll,
};
