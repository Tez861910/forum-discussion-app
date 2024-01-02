const { query } = require('../../db');

async function handlePollOptionCreate(req, res) {
  const { pollId, optionText } = req.body;

  try {
    if (!pollId || !optionText) {
      console.log('PollID and OptionText are required');
      return res.status(400).json({ error: 'PollID and OptionText are required' });
    }

    const sql = 'INSERT INTO PollOptions (PollID, OptionText) VALUES (?, ?)';
    const [result] = await query(sql, [pollId, optionText]);

    if (result.affectedRows === 1) {
      console.log('Poll option created successfully');
      res.json({ message: 'Poll option created successfully' });
    } else {
      console.error('Poll option creation failed');
      res.status(500).json({ error: 'Poll option creation failed' });
    }
  } catch (error) {
    console.error('Error creating poll option:', error);
    res.status(500).json({ error: 'Poll option creation failed', details: error.message });
  }
}

module.exports = {
  handlePollOptionCreate,
};
