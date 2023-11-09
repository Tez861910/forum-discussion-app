const { query } = require('../db');

async function handleUsersGetId(req, res) {
  const { id } = req.params;

  try {
    const sql = `
      SELECT 
        users.*,
        roles.RoleName
      FROM users
      JOIN roles ON users.RoleID = roles.RoleID
      WHERE users.UserID = ?
    `;

    const results = await query(sql, [id]);

    if (results.length > 0) {
      console.log('User fetched successfully');
      res.json({ user: results[0] });
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
