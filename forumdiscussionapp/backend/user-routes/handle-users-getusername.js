const { query } = require('../db');

async function handleUsersGetUserName(req,res){
  const { userIds } = req.body;

  try {
    const placeholders = userIds.map(() => '?').join(', ');
    const sql = `SELECT UserID, UserName FROM users WHERE UserID IN (${placeholders}) AND IsDeleted = FALSE`;
    const results = await query(sql, userIds);

    const usernames = {};
    results.forEach(result => {
      usernames[result.UserID] = result.UserName;
    });

    console.log('Usernames fetched successfully');
    res.json({ usernames });
  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).json({ error: 'Usernames retrieval failed', details: error.message });
  }
}
module.exports = {
    handleUsersGetUserName,
  };
  
