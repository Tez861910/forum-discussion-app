const { query } = require('../../../db');

async function handleDepartmentDelete(req, res) {
  const { departmentId } = req.params;

  try {
    const sql = 'DELETE FROM Departments WHERE DepartmentID = ?';
    const [result] = await query(sql, [departmentId]);

    if (result.affectedRows === 1) {
      console.log('Department deleted successfully');
      res.json({ message: 'Department deleted successfully' });
    } else {
      console.error('Department deletion failed');
      res.status(500).json({ error: 'Department deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Department deletion failed', details: error.message });
  }
}

module.exports = {
  handleDepartmentDelete,
};
