const { query } = require('../../../db');

async function handleAnswerUpdateById(req, res) {
  const { answerId } = req.params;
  const { questionId, answerText, createdByUserId } = req.body;

  try {
    const sql = 'UPDATE Answer SET QuestionID = ?, AnswerText = ?, CreatedByUserID = ? WHERE AnswerID = ?';
    const [result] = await query(sql, [questionId, answerText, createdByUserId, answerId]);

    if (result.affectedRows === 1) {
      console.log('Answer updated successfully');
      res.json({ message: 'Answer updated successfully' });
    } else {
      console.error('Answer update failed');
      res.status(500).json({ error: 'Answer update failed' });
    }
  } catch (error) {
    console.error('Error updating answer:', error);
    res.status(500).json({ error: 'Answer update failed', details: error.message });
  }
}

module.exports = {
  handleAnswerUpdateById,
};
