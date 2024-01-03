const { query } = require('../../db');

async function handleUserPollVoteDeleteById(req, res) {
  const { userPollVoteId } = req.params;

  try {
    const sql = 'DELETE FROM UserPollVotes WHERE UserPollVoteID = ?';
    const [result] = await query(sql, [userPollVoteId]);

    if (result.affectedRows === 1) {
      console.log('User poll vote deleted successfully');
      res.json({ message: 'User poll vote deleted successfully' });
    } else {
      console.error('User poll vote deletion failed');
      res.status(500).json({ error: 'User poll vote deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting user poll vote:', error);
    res.status(500).json({ error: 'Error deleting user poll vote', details: error.message });
  }
}

module.exports = {
  handleUserPollVoteDeleteById,
};