const { query } = require('../../../db');

async function handleBanCreate(req, res) {
  const { bannedUserId, bannedByUserId, banReason, banExpiresAt } = req.body;

  try {
    if (!bannedUserId || !bannedByUserId || !banReason) {
      console.log('BannedUserId, BannedByUserId, and BanReason are required');
      return res
        .status(400)
        .json({ error: 'BannedUserId, BannedByUserId, and BanReason are required' });
    }

    const sql =
      'INSERT INTO Bans (BannedUserID, BannedByUserID, BanReason, BanExpiresAt) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [bannedUserId, bannedByUserId, banReason, banExpiresAt]);

    if (result.affectedRows === 1) {
      console.log('Ban created successfully');
      res.json({ message: 'Ban created successfully' });
    } else {
      console.error('Ban creation failed');
      res.status(500).json({ error: 'Ban creation failed' });
    }
  } catch (error) {
    console.error('Error creating ban:', error);
    res.status(500).json({ error: 'Ban creation failed', details: error.message });
  }
}

module.exports = {
  handleBanCreate,
};
