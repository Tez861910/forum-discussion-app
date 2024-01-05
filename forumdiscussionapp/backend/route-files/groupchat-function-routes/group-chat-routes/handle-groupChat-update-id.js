const { query } = require('../../../db');

async function handleGroupChatUpdateById(req, res) {
  const { groupId } = req.params;
  const { groupName, description, isPublic, maxMembers, category, coverPhotoURL, welcomeMessage, moderatorUserId } = req.body;

  try {
    const sql =
      'UPDATE GroupChat SET GroupName = ?, Description = ?, IsPublic = ?, MaxMembers = ?, Category = ?, CoverPhotoURL = ?, WelcomeMessage = ?, ModeratorUserID = ? WHERE GroupID = ?';
    const [result] = await query(sql, [groupName, description, isPublic, maxMembers, category, coverPhotoURL, welcomeMessage, moderatorUserId, groupId]);

    if (result.affectedRows === 1) {
      console.log('Group chat updated successfully');
      res.json({ message: 'Group chat updated successfully' });
    } else {
      console.error('Group chat update failed');
      res.status(500).json({ error: 'Group chat update failed' });
    }
  } catch (error) {
    console.error('Error updating group chat:', error);
    res.status(500).json({ error: 'Group chat update failed', details: error.message });
  }
}

module.exports = {
  handleGroupChatUpdateById,
};
