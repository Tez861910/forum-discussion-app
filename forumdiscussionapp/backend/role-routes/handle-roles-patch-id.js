const { query } = require('../db');

async function handleRolesPatchId(req, res) {
  const { id } = req.params;

  try {
    const { IsDeleted } = req.body;

    if (IsDeleted === undefined || typeof IsDeleted !== 'boolean') {
      console.error('Invalid IsDeleted value provided');
      return res.status(400).json({ error: 'Invalid IsDeleted value' });
    }

    const sql = 'UPDATE roles SET IsDeleted = ? WHERE RoleID = ?';
    const [result] = await query(sql, [IsDeleted, id]);

    if (result.affectedRows === 1) {
      console.log('Role updated successfully');
      return res.status(200).json({ message: 'Role updated successfully' });
    } else {
      console.error('Role update failed');
      return res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error('Error updating role:', error);
    return res.status(500).json({ error: 'Role update failed', details: error.message });
  }
}

module.exports = {
  handleRolesPatchId,
};
