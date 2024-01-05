const { query } = require('../../../db');

async function handleRolesUpdateId(req, res) {
  const { id } = req.params;
  const { roleName, roleDescription } = req.body;

  try {
    if (!roleName) {
      console.log('Role name is required');
      return res.status(400).json({ error: 'Role name is required' });
    }

    // Check if the role with the provided ID exists and is not deleted
    const checkRoleSql = 'SELECT * FROM Roles r INNER JOIN CommonAttributes ca ON r.CommonAttributeID = ca.AttributeID WHERE r.RoleID = ? AND ca.IsDeleted = false';
    const [checkRoleResult] = await query(checkRoleSql, [id]);

    if (!checkRoleResult || checkRoleResult.length !== 1) {
      console.error('Role not found');
      return res.status(404).json({ error: 'Role not found' });
    }

    // Update the role
    const updateRoleSql = 'UPDATE Roles r SET r.RoleName = ?, r.RoleDescription = ? WHERE r.RoleID = ?';
    const [result] = await query(updateRoleSql, [roleName, roleDescription, id]);

    if (result.affectedRows === 1) {
      console.log('Role updated successfully');
      res.json({ message: 'Role updated successfully' });
    } else {
      console.error('Role update failed');
      res.status(500).json({ error: 'Role update failed' });
    }
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: 'Role update failed', details: error.message });
  }
}

module.exports = {
  handleRolesUpdateId,
};
