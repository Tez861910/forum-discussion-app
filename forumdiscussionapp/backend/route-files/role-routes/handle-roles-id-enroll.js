const { query } = require('../../db');

async function handleRolesIdEnroll(req, res) {
  try {
    const userIds = req.body.userIds;
    const roleId = req.params.roleId;
    const createdByUserId = req.params.createdByUserId; 

    // Create a CommonAttributes entry
    const createCommonAttributeSql = 'INSERT INTO CommonAttributes (CreatedByUserID) VALUES (?)';
    const [commonAttributeResult] = await query(createCommonAttributeSql, [createdByUserId]);

    if (!commonAttributeResult || commonAttributeResult.affectedRows !== 1) {
      console.error('Error creating CommonAttributes entry');
      return res.status(500).json({ error: 'Internal Server Error', details: 'Error creating CommonAttributes entry' });
    }

    const commonAttributeId = commonAttributeResult.insertId;

    // Check if any of the users already has the role
    const existingRolesSql = 'SELECT UserRoleID FROM UserRoles ur INNER JOIN CommonAttributes ca ON ur.CommonAttributeID = ca.AttributeID WHERE ur.RoleID = ? AND ur.UserID IN (?) AND ca.IsDeleted = FALSE';
    const [existingRolesResult] = await query(existingRolesSql, [roleId, userIds]);

    // Check if the role assignment already exists for any user
    if (existingRolesResult && existingRolesResult.length > 0) {
      const existingUserIds = existingRolesResult.map(role => role.UserID);
      return res.status(400).json({ error: 'Some users already have the specified role', existingUserIds });
    }

    // Assign the role to each user
    const assignRoleSql = 'INSERT INTO UserRoles (UserID, RoleID, CommonAttributeID) VALUES ?';
    const values = userIds.map((userId) => [userId, roleId, commonAttributeId]);
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
