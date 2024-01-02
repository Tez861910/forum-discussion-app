const { query } = require('../db');

async function handleUsersGetRoleId(req, res) {
  const { roleId } = req.params;

  try {
    const sql = `
      SELECT Users.userName
      FROM Users
      INNER JOIN UserRoles ON Users.UserID = UserRoles.UserID
      INNER JOIN CommonAttributes ON Users.CommonAttributeID = CommonAttributes.AttributeID
      WHERE UserRoles.RoleID = ? AND CommonAttributes.IsDeleted = FALSE;
    `;
    const results = await query(sql, [roleId]);

    console.log('User names fetched successfully');
    res.json({ userNames: results.map((row) => row.userName) });
  } catch (error) {
    console.error('Error fetching user names:', error);
    res.status(500).json({ error: 'User names retrieval failed', details: error.message });
  }
}

module.exports = {
  handleUsersGetRoleId,
};
