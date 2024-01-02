const { query } = require('../../db');

async function handlePollOptionUpdateById(req, res) {
  const { pollOptionId } = req.params;
  const { optionText } = req.body;

  try {
    if (!optionText) {
      console.log('OptionText is required for update');
      return res.status(400).json({ error: 'OptionText is required for update' });
    }

    const sql = 'UPDATE PollOptions SET OptionText = ? WHERE PollOptionID = ?';
    const [result] = await query(sql, [optionText, pollOptionId]);

    if (result.affectedRows === 1) {
      console.log('Poll option updated successfully');
      res.json({ message: 'Poll option updated successfully' });
    } else {
      console.error('Poll option update failed');
      res.status(500).json({ error: 'Poll option update failed' });
    }
  } catch (error) {
    console.error('Error updating poll option:', error);
    res.status(500).json({ error: 'Poll option update failed', details: error.message });
  }
}

module.exports = {
  handlePollOptionUpdateById,
};
