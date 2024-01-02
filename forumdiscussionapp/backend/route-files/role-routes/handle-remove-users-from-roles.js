const { query } = require('../../db');

async function handleRemoveUsersFromRole(req, res) {
  try {
    const roleId = req.params.roleId;
    const userIds = req.body.userIds;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty user IDs provided' });
    }

    // Check if the role assignments exist and are not deleted
    const checkRolesSql = 'SELECT * FROM UserRoles ur INNER JOIN CommonAttributes ca ON ur.CommonAttributeID = ca.AttributeID WHERE ur.RoleID = ? AND ur.UserID IN (?) AND ca.IsDeleted = FALSE';
    const [checkRolesResult] = await query(checkRolesSql, [roleId, userIds]);

    if (!checkRolesResult || checkRolesResult.length === 0) {
      return res.status(404).json({ error: 'Enrollment not found or already removed' });
    }

    // Soft-delete the role assignments
    const updateSql = 'UPDATE CommonAttributes SET IsDeleted = TRUE WHERE AttributeID IN (?)';
    const commonAttributeIds = checkRolesResult.map(role => role.CommonAttributeID);
    const [updateResult] = await query(updateSql, [commonAttributeIds]);

    if (updateResult.affectedRows === 0) {
      console.error('Error removing users from role');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(`Users removed from the role ${roleId}.`);

    res.json({ message: 'Users removed from the role successfully' });
  } catch (error) {
    console.error('Error removing users from role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  handleRemoveUsersFromRole,
};
