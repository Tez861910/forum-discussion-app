const { query } = require('../../db');

async function handleRequestGet(req, res) {
  const { requestId } = req.params;

  try {
    const sql = 'SELECT * FROM FriendRequests WHERE RequestID = ?';
    const [result] = await query(sql, [requestId]);

    if (result.length > 0) {
      console.log('Friend request retrieved successfully');
      res.json({ friendRequest: result[0] });
    } else {
      console.error('Friend request not found');
      res.status(404).json({ error: 'Friend request not found' });
    }
  } catch (error) {
    console.error('Error getting friend request:', error);
    res.status(500).json({ error: 'Error getting friend request', details: error.message });
  }
}

module.exports = {
  handleRequestGet,
};
