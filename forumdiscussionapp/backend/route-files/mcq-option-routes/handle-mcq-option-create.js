const { query } = require('../../db');

async function handleMCQOptionCreate(req, res) {
  const { mcqQuestionId, mcqOptionText, isCorrect, createdByUserId } = req.body;

  try {
    if (!mcqQuestionId || !mcqOptionText || !createdByUserId) {
      console.log('MCQQuestionID, MCQOptionText, and CreatedByUserId are required');
      return res.status(400).json({
        error: 'MCQQuestionID, MCQOptionText, and CreatedByUserId are required',
      });
    }

    const sql =
      'INSERT INTO MCQOptions (MCQQuestionID, MCQOptionText, IsCorrect, CreatedByUserID) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [mcqQuestionId, mcqOptionText, isCorrect, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('MCQ option created successfully');
      res.json({ message: 'MCQ option created successfully' });
    } else {
      console.error('MCQ option creation failed');
      res.status(500).json({ error: 'MCQ option creation failed' });
    }
  } catch (error) {
    console.error('Error creating MCQ option:', error);
    res.status(500).json({ error: 'MCQ option creation failed', details: error.message });
  }
}

module.exports = {
  handleMCQOptionCreate,
};
