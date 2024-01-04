const { query } = require('../../db');

async function handleFacultyDelete(req, res) {
  const { facultyId } = req.params;

  try {
    const sql = 'DELETE FROM FacultyMembers WHERE FacultyID = ?';
    const [result] = await query(sql, [facultyId]);

    if (result.affectedRows === 1) {
      console.log('Faculty member deleted successfully');
      res.json({ message: 'Faculty member deleted successfully' });
    } else {
      console.error('Faculty member deletion failed');
      res.status(500).json({ error: 'Faculty member deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting faculty member:', error);
    res.status(500).json({ error: 'Faculty member deletion failed', details: error.message });
  }
}

module.exports = {
  handleFacultyDelete,
};
