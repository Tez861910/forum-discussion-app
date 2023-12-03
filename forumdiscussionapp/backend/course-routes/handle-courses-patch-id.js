const { query } = require('../db');

async function handleCoursesPatchId(req, res) {
  try {
    const { id } = req.params;

    const updateSql = 'UPDATE courses SET IsDeleted = TRUE WHERE CourseID = ?';
    const [result] = await query(updateSql, [id]);

    if (result.affectedRows === 1) {
      console.log('Course soft-deleted successfully');
      res.json({ message: 'Course soft-deleted successfully' });
    } else {
      console.error('Course soft-deletion failed');
      res.status(500).json({ error: 'Course soft-deletion failed' });
    }
  } catch (error) {
    console.error('Error soft-deleting course:', error);
    res.status(500).json({ error: 'Course soft-deletion failed', details: error.message });
  }
}

module.exports = {
  handleCoursesPatchId,
};
