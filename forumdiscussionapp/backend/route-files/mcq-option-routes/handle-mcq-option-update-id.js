const { query } = require('../../db');

async function handleMCQOptionUpdateById(req, res) {
  const { mcqOptionId } = req.params;
  const { mcqQuestionId, mcqOptionText, isCorrect, createdByUserId } = req.body;

  try {
    const sql =
      'UPDATE MCQOptions SET MCQQuestionID = ?, MCQOptionText = ?, IsCorrect = ?, CreatedByUserID = ? WHERE MCQOptionID = ?';
    const [result] = await query(sql, [mcqQuestionId, mcqOptionText, isCorrect, createdByUserId, mcqOptionId]);

    if (result.affectedRows === 1) {
      console.log('MCQ option updated successfully');
      res.json({ message: 'MCQ option updated successfully' });
    } else {
      console.error('MCQ option update failed');
      res.status(500).json({ error: 'MCQ option update failed' });
    }
  } catch (error) {
    console.error('Error updating MCQ option:', error);
    res.status(500).json({ error: 'MCQ option update failed', details: error.message });
  }
}

module.exports = {
  handleMCQOptionUpdateById,
};
