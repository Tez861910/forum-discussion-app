const { query } = require('../../db');

async function handleAnswerCreate(req, res) {
  const { questionId, answerText, createdByUserId } = req.body;

  try {
    if (!questionId || !answerText || !createdByUserId) {
      console.log('QuestionID, AnswerText, and CreatedByUserId are required');
      return res.status(400).json({
        error: 'QuestionID, AnswerText, and CreatedByUserId are required',
      });
    }

    const sql = 'INSERT INTO Answer (QuestionID, AnswerText, CreatedByUserID) VALUES (?, ?, ?)';
    const [result] = await query(sql, [questionId, answerText, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Answer created successfully');
      res.json({ message: 'Answer created successfully' });
    } else {
      console.error('Answer creation failed');
      res.status(500).json({ error: 'Answer creation failed' });
    }
  } catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).json({ error: 'Answer creation failed', details: error.message });
  }
}

module.exports = {
  handleAnswerCreate,
};
