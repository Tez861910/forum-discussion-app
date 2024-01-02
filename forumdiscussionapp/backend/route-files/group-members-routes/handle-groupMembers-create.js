const { query } = require('../../db');

async function handleGroupMembersCreate(req, res) {
  const { groupId, userId } = req.body;

  try {
    if (!groupId || !userId) {
      console.log('GroupID and UserID are required');
      return res.status(400).json({
        error: 'GroupID and UserID are required',
      });
    }

    const sql = 'INSERT INTO GroupMembers (GroupID, UserID) VALUES (?, ?)';
    const [result] = await query(sql, [groupId, userId]);

    if (result.affectedRows === 1) {
      console.log('Group member added successfully');
      res.json({ message: 'Group member added successfully' });
    } else {
      console.error('Group member addition failed');
      res.status(500).json({ error: 'Group member addition failed' });
    }
  } catch (error) {
    console.error('Error adding group member:', error);
    res.status(500).json({ error: 'Group member addition failed', details: error.message });
  }
}

module.exports = {
  handleGroupMembersCreate,
};
