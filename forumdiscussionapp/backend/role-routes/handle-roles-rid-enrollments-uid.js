const { query } = require('../db');

async function handleRIDEnrollmentsUID(req, res) {
  try {
    const roleId = req.params.roleId;
    const userId = req.params.userId;

    const updateSql = 'UPDATE UserRoles SET IsDeleted = TRUE WHERE UserID = ? AND RoleID = ?';
    const updateResult = await query(updateSql, [userId, roleId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Role assignment not found or already removed' });
    }

    console.log(`Role ${roleId} removed from user ${userId}.`);

    res.json({ message: 'Role removed from the user successfully' });
  } catch (error) {
    console.error('Error removing role from user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    handleRIDEnrollmentsUID,
};