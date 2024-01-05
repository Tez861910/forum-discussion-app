const { query } = require('../../../db');

async function handleUsersGetRoleId(req, res) {
  // Extracting roleId from request parameters
  const { roleId } = req.params;

  try {
    // SQL query to fetch all user names for a given role ID
    const sql = `
      SELECT Users.userName
      FROM Users
      INNER JOIN UserRoles ON Users.UserID = UserRoles.UserID
      INNER JOIN CommonAttributes ON Users.CommonAttributeID = CommonAttributes.AttributeID
      WHERE UserRoles.RoleID = ? AND CommonAttributes.IsDeleted = FALSE;
    `;
    
    // Executing the query with the provided role ID
    const results = await query(sql, [roleId]);

    // Logging success and sending JSON response with all user names
    console.log('User names fetched successfully');
    res.json({ userNames: results.map((row) => row.userName) });
  } catch (error) {
    // Logging error and sending a 500 Internal Server Error response
    console.error('Error fetching user names:', error);
    res.status(500).json({ error: 'User names retrieval failed', details: error.message });
  }
}

// Exporting the route handler function
module.exports = {
  handleUsersGetRoleId,
};
