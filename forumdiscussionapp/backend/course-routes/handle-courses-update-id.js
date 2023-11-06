const { query } = require('../db');

async function handleCoursesUpdateId(req, res) {
{
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
  }  
};
  
module.exports = {
  handleCoursesUpdateId,
};