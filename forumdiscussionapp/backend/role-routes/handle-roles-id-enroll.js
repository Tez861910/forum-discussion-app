const { query } = require('../db');

async function handleRolesIdEnroll(req, res) {
  try {
    const userId = req.body.userId;
    const roleId = req.params.roleId;

    // Check if the user already has the role
    const existingRoleSql = 'SELECT UserRoleID FROM userroles WHERE UserID = ? AND RoleID = ?';
    const [existingRoleResult] = await query(existingRoleSql, [userId, roleId]);

    // Check if the role assignment already exists
    if (existingRoleResult && existingRoleResult.length > 0) {
      return res.status(400).json({ error: 'User already has the specified role' });
    }

    // Assign the role to the user
    const assignRoleSql = 'INSERT INTO userroles (UserID, RoleID) VALUES (?, ?)';
    await query(assignRoleSql, [userId, roleId]);

    res.json({ message: 'Role assigned to the user successfully' });
  } catch (error) {
    console.error('Error assigning role to user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
    handleRolesIdEnroll,
};