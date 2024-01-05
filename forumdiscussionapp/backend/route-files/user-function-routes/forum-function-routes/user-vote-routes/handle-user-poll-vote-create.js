const { query } = require('../../../db');

async function handleUserPollVoteCreate(req, res) {
  const { userId, pollOptionId } = req.body;

  try {
    if (!userId || !pollOptionId) {
      console.log('UserID and PollOptionID are required');
      return res.status(400).json({ error: 'UserID and PollOptionID are required' });
    }

    const sql = 'INSERT INTO UserPollVotes (UserID, PollOptionID) VALUES (?, ?)';
    const [result] = await query(sql, [userId, pollOptionId]);

    if (result.affectedRows === 1) {
      console.log('User poll vote created successfully');
      res.json({ message: 'User poll vote created successfully' });
    } else {
      console.error('User poll vote creation failed');
      res.status(500).json({ error: 'User poll vote creation failed' });
    }
  } catch (error) {
    console.error('Error creating user poll vote:', error);
    res.status(500).json({ error: 'User poll vote creation failed', details: error.message });
  }
}

module.exports = {
  handleUserPollVoteCreate,
};
