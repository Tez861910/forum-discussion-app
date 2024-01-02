const { query } = require('../db');

async function handleUsersGetUserName(req, res) {
  const { userIds } = req.body;

  try {
    // Assuming CommonAttributes table has an IsDeleted column
    const placeholders = userIds.map(() => '?').join(', ');
    const sql = `
      SELECT u.UserID, u.UserName
      FROM users u
      INNER JOIN CommonAttributes ca ON u.CommonAttributeID = ca.AttributeID
      WHERE u.UserID IN (${placeholders}) AND ca.IsDeleted = FALSE
    `;
    const results = await query(sql, userIds);

    const usernames = {};
    results.forEach((result) => {
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
