const { query } = require('../../../db');

async function handlePollCreate(req, res) {
  const { question, createdByUserId } = req.body;

  try {
    if (!question || !createdByUserId) {
      console.log('Question and createdByUserId are required');
      return res.status(400).json({ error: 'Question and createdByUserId are required' });
    }

    const sql = 'INSERT INTO Polls (PollQuestion, CreatedByUserID) VALUES (?, ?)';
    const [result] = await query(sql, [question, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Poll created successfully');
      res.json({ message: 'Poll created successfully' });
    } else {
      console.error('Poll creation failed');
      res.status(500).json({ error: 'Poll creation failed' });
    }
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: 'Poll creation failed', details: error.message });
  }
}

module.exports = {
  handlePollCreate,
};
