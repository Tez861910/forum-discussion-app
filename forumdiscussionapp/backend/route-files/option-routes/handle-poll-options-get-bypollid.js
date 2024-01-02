const { query } = require('../../db');

async function handlePollOptionGetByPollId(req, res) {
  const { pollId } = req.params;

  try {
    const sql = 'SELECT * FROM PollOptions WHERE PollID = ?';
    const [result] = await query(sql, [pollId]);

    console.log('Poll options retrieved successfully for pollId:', pollId);
    res.json(result);
  } catch (error) {
    console.error('Error getting poll options for pollId:', pollId, error);
    res.status(500).json({ error: 'Error getting poll options', details: error.message });
  }
}

module.exports = {
  handlePollOptionGetByPollId,
};
