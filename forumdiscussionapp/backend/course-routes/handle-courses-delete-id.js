const { query } = require('../db');

async function handleCoursesDeleteId(req, res) {
    {
        const { id } = req.params;
      
        try {
          const sql = 'DELETE FROM courses WHERE CourseID = ?';
          const [result] = await query(sql, [id]);
      
          if (result.affectedRows === 1) {
            console.log('Course deleted successfully');
            res.json({ message: 'Course deleted successfully' });
          } else {
            console.error('Course deletion failed');
            res.status(500).json({ error: 'Course deletion failed' });
          }
        } catch (error) {
          console.error('Error deleting course:', error);
          res.status(500).json({ error: 'Course deletion failed', details: error.message });
        }
    }
};

module.exports = {
  handleCoursesDeleteId,
};