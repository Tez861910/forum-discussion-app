const { query } = require('../db');

const handleCIDEnrollmentsEID = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const enrollmentId = req.params.enrollmentId;
  
      // Check if the enrollment exists
      const enrollmentSql = 'SELECT * FROM usercourses WHERE UserCourseID = ?';
      const [enrollmentResult] = await query(enrollmentSql, [enrollmentId]);
  
      if (!enrollmentResult || enrollmentResult.length === 0) {
        return res.status(404).json({ error: 'Enrollment not found or already removed' });
      }      
  
      // Remove the user from the course
      const deleteSql = 'DELETE FROM usercourses WHERE UserCourseID = ?';
      const deleteResult = await query(deleteSql, [enrollmentId]);

      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ error: 'Enrollment not found or already removed' });
      }

      res.json({ message: 'User removed from the course successfully' });
    } catch (error) {
      console.error('Error removing user from course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  handleCIDEnrollmentsEID,
};
