const { query } = require('../db');

async function handleUsersGet(req, res) {
  try {
    const sql = 'SELECT * FROM users WHERE IsDeleted = FALSE';
    const results = await query(sql);

    console.log('Users fetched successfully');
    res.json({ users: results });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'User retrieval failed', details: error.message });
  }
}

module.exports = {
  handleUsersGet,
};
