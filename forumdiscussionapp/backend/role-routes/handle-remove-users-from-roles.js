const { query } = require('../db');

async function handleRemoveUsersFromRole(req, res) {
  try {
    const roleId = req.params.roleId;
    const userIds = req.body.userIds;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty user IDs provided' });
    }

    const updateSql = 'UPDATE UserRole SET IsDeleted = TRUE WHERE UserID IN (?) AND RoleID = ?';
    const updateResult = await query(updateSql, [userIds, roleId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found or already removed' });
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
