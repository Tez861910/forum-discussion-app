const { query } = require('../../db');

async function handleBanUpdate(req, res) {
  const { banId } = req.params;
  const { bannedUserId, bannedByUserId, banReason, banExpiresAt } = req.body;

  try {
    if (!bannedUserId || !bannedByUserId || !banReason) {
      console.log('BannedUserId, BannedByUserId, and BanReason are required');
      return res
        .status(400)
        .json({ error: 'BannedUserId, BannedByUserId, and BanReason are required' });
    }

    const sql =
      'UPDATE Bans SET BannedUserID = ?, BannedByUserID = ?, BanReason = ?, BanExpiresAt = ? WHERE BanID = ?';
    const [result] = await query(sql, [bannedUserId, bannedByUserId, banReason, banExpiresAt, banId]);

    if (result.affectedRows === 1) {
      console.log('Ban updated successfully');
      res.json({ message: 'Ban updated successfully' });
    } else {
      console.error('Ban update failed');
      res.status(500).json({ error: 'Ban update failed' });
    }
  } catch (error) {
    console.error('Error updating ban:', error);
    res.status(500).json({ error: 'Ban update failed', details: error.message });
  }
}

module.exports = {
  handleBanUpdate,
};
