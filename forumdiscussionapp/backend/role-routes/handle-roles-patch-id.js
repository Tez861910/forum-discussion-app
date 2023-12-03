const { query } = require('../db');

async function handleRolesPatchId(req, res) {
  const { id } = req.params;

  try {
    const updateSql = 'UPDATE roles SET IsDeleted = TRUE WHERE RoleID = ?';
    const [result] = await query(updateSql, [id]);

    if (result.affectedRows === 1) {
      console.log('Role soft-deleted successfully');
      res.json({ message: 'Role soft-deleted successfully' });
    } else {
      console.error('Role soft-deletion failed');
      res.status(500).json({ error: 'Role soft-deletion failed' });
    }
  } catch (error) {
    console.error('Error soft-deleting role:', error);
    res.status(500).json({ error: 'Role soft-deletion failed', details: error.message });
  }
}

module.exports = {
  handleRolesPatchId,
};
