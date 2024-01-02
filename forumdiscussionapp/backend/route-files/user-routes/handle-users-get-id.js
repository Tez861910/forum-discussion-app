const { query } = require('../../db');

async function handleUsersGetId(req, res) {
  const { id: userId } = req.params;

  try {
    // Fetch user data including the role ID
    const userSql = `
      SELECT 
        users.*,
        roles.RoleID,
        commonAttributes.IsDeleted AS CommonAttributeIsDeleted
      FROM users
      LEFT JOIN userroles ON users.UserID = userroles.UserID
      LEFT JOIN roles ON userroles.RoleID = roles.RoleID
      LEFT JOIN commonattributes ON users.CommonAttributeID = commonattributes.AttributeID
      WHERE users.UserID = ?
    `;

    const userResults = await query(userSql, [userId]);

    if (userResults.length > 0) {
      const user = userResults[0];

      // Check if user is deleted in CommonAttributes
      if (user.CommonAttributeIsDeleted) {
        console.error('User is deleted');
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.RoleID) {
        // Fetch role name based on the retrieved RoleID
        const roleNameSql = `
          SELECT RoleName
          FROM roles
          LEFT JOIN commonattributes ON roles.CommonAttributeID = commonattributes.AttributeID
          WHERE RoleID = ? AND commonattributes.IsDeleted = FALSE
        `;

        const roleNameResult = await query(roleNameSql, [user.RoleID]);

        if (roleNameResult.length > 0) {
          user.RoleName = roleNameResult[0].RoleName;
        }
      }

      console.log('User fetched successfully');
      res.json({ user });
    } else {
      console.error('User not found');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'User retrieval by ID failed', details: error.message });
  }
}

module.exports = {
  handleUsersGetId,
};
