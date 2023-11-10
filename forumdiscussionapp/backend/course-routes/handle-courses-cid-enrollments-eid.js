const { query } = require('../db');

const handleCIDEnrollmentsEID = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId; 

    // Remove the user from the course
    const deleteSql = 'DELETE FROM usercourses WHERE UserID = ? AND CourseID = ?';
    const deleteResult = await query(deleteSql, [userId, courseId]);

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

