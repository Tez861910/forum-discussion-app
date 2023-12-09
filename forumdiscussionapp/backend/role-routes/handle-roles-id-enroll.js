const { query } = require('../db');

async function handleRolesIdEnroll(req, res) {
  const { userIds, roleId } = req.body; 

  try {
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid user IDs provided' });
    }

    // Check if any of the users already has the role
    const existingRolesSql = 'SELECT UserID FROM userroles WHERE RoleID = ? AND UserID IN (?)';
    const [existingRolesResult] = await query(existingRolesSql, [roleId, userIds]);

    // Check if the role assignment already exists for any user
    if (existingRolesResult && existingRolesResult.length > 0) {
      const existingUserIds = existingRolesResult.map((result) => result.UserID);
      return res.status(400).json({ error: 'Some users already have the specified role', existingUserIds });
    }

    // Assign the role to each user
    const assignRoleSql = 'INSERT INTO userroles (UserID, RoleID) VALUES ?';
    const values = userIds.map((userId) => [userId, roleId]);
    await query(assignRoleSql, [values]);

    res.json({ message: 'Role assigned to the users successfully' });
  } catch (error) {
    console.error('Error assigning role to users:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  handleRolesIdEnroll,
};

