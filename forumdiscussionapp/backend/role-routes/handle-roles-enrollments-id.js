const { query } = require('../db');

async function handleRolesEnrollmentsId(req, res) {
  const roleId = req.params.roleId;
  console.log('Received roleId:', roleId);

  try {
    if (!query) {
      throw new Error('Database connection not established or query function not defined.');
    }

    const sql = `
      SELECT
        users.UserID,
        users.UserName
      FROM
        users
      JOIN
        userroles ON users.UserID = userroles.UserID
      WHERE
        userroles.RoleID = ? AND userroles.IsDeleted = FALSE;
    `;
    console.log('SQL Query:', sql);

    const rows = await query(sql, [parseInt(roleId, 10)]);

    console.log('Query Result:', rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No users found for the specified role' });
    }

    const enrollmentsResult = {};
    rows.forEach(row => {
      const { UserID, UserName } = row;
      if (!enrollmentsResult[UserID]) {
        enrollmentsResult[UserID] = [];
      }
      enrollmentsResult[UserID].push({ UserID, UserName });
    });

    res.json({ enrollments: enrollmentsResult });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    handleRolesEnrollmentsId,
};