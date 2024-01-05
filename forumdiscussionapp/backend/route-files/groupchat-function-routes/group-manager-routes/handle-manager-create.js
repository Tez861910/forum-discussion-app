const { query } = require('../../../db');

async function handleManagerCreate(req, res) {
  const { groupId, managerUserId } = req.body;

  try {
    const sql = 'INSERT INTO GroupManager (GroupID, ManagerUserID) VALUES (?, ?)';
    const [result] = await query(sql, [groupId, managerUserId]);

    if (result.affectedRows === 1) {
      console.log('Group manager created successfully');
      res.json({ message: 'Group manager created successfully' });
    } else {
      console.error('Group manager creation failed');
      res.status(500).json({ error: 'Group manager creation failed' });
    }
  } catch (error) {
    console.error('Error creating group manager:', error);
    res.status(500).json({ error: 'Group manager creation failed', details: error.message });
  }
}

module.exports = {
  handleManagerCreate,
};
