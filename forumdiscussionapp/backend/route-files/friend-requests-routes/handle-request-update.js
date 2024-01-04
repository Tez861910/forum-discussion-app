const { query } = require('../../db');

async function handleRequestUpdate(req, res) {
  const { requestId } = req.params;
  const { requestStatus } = req.body;

  try {
    const sql = 'UPDATE FriendRequests SET RequestStatus = ? WHERE RequestID = ?';
    const [result] = await query(sql, [requestStatus, requestId]);

    if (result.affectedRows === 1) {
      console.log('Friend request updated successfully');
      res.json({ message: 'Friend request updated successfully' });
    } else {
      console.error('Friend request update failed');
      res.status(500).json({ error: 'Friend request update failed' });
    }
  } catch (error) {
    console.error('Error updating friend request:', error);
    res.status(500).json({ error: 'Friend request update failed', details: error.message });
  }
}

module.exports = {
  handleRequestUpdate,
};
