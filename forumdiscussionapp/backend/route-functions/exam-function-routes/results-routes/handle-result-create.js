const { query } = require('../../../db');

async function handleResultCreate(req, res) {
  const { userId, examId, totalScore, percentage, additionalMetrics } = req.body;

  try {
    const sql = 'INSERT INTO Results (UserID, ExamID, TotalScore, Percentage, AdditionalMetrics) VALUES (?, ?, ?, ?, ?)';
    const [result] = await query(sql, [userId, examId, totalScore, percentage, additionalMetrics]);

    if (result.affectedRows === 1) {
      console.log('Exam result created successfully');
      res.json({ message: 'Exam result created successfully' });
    } else {
      console.error('Exam result creation failed');
      res.status(500).json({ error: 'Exam result creation failed' });
    }
  } catch (error) {
    console.error('Error creating exam result:', error);
    res.status(500).json({ error: 'Exam result creation failed', details: error.message });
  }
}

module.exports = {
  handleResultCreate,
};
