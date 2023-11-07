const { query } = require('../db');

async function handleUsersDeleteId(req, res) {
  const { id } = req.params;

  try {
    // SQL query to delete the user's associated records in usercourses table
    const deleteUserCoursesSql = 'DELETE FROM usercourses WHERE UserID = ?';
    await query(deleteUserCoursesSql, [id]);

    // SQL query to delete the user's associated records in userroles table
    const deleteUserRolesSql = 'DELETE FROM userroles WHERE UserID = ?';
    await query(deleteUserRolesSql, [id]);

    // SQL query to delete the user
    const deleteUserSql = 'DELETE FROM users WHERE UserID = ?';
    const [deleteUserResult] = await query(deleteUserSql, [id]);

    if (deleteUserResult.affectedRows === 1) {
      console.log('User and associated records deleted successfully');
      res.json({ message: 'User and associated records deleted successfully' });
    } else {
      console.error('User deletion failed');
      res.status(500).json({ error: 'User deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'User deletion failed', details: error.message });
  }
}

module.exports = {
  handleUsersDeleteId,
};
