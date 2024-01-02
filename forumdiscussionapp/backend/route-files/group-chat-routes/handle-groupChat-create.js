const { query } = require('../../db');

async function handleGroupChatCreate(req, res) {
  const { groupName, description, creatorUserId, isPublic, maxMembers, category, coverPhotoURL, welcomeMessage, moderatorUserId } = req.body;

  try {
    if (!groupName || !creatorUserId) {
      console.log('GroupName and CreatorUserID are required');
      return res.status(400).json({
        error: 'GroupName and CreatorUserID are required',
      });
    }

    const sql =
      'INSERT INTO GroupChat (GroupName, Description, CreatorUserID, IsPublic, MaxMembers, Category, CoverPhotoURL, WelcomeMessage, ModeratorUserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await query(sql, [groupName, description, creatorUserId, isPublic, maxMembers, category, coverPhotoURL, welcomeMessage, moderatorUserId]);

    if (result.affectedRows === 1) {
      console.log('Group chat created successfully');
      res.json({ message: 'Group chat created successfully' });
    } else {
      console.error('Group chat creation failed');
      res.status(500).json({ error: 'Group chat creation failed' });
    }
  } catch (error) {
    console.error('Error creating group chat:', error);
    res.status(500).json({ error: 'Group chat creation failed', details: error.message });
  }
}

module.exports = {
  handleGroupChatCreate,
};
