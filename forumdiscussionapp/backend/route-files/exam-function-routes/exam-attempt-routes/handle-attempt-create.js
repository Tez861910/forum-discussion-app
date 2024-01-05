const { query } = require('../../../db');

async function handleAttemptCreate(req, res) {
  const { userId, examId, startTime, endTime, status } = req.body;

  try {
    const sql = 'INSERT INTO ExamAttempt (UserID, ExamID, StartTime, EndTime, Status) VALUES (?, ?, ?, ?, ?)';
    const [result] = await query(sql, [userId, examId, startTime, endTime, status]);

    if (result.affectedRows === 1) {
      console.log('Exam attempt created successfully');
      res.json({ message: 'Exam attempt created successfully' });
    } else {
      console.error('Exam attempt creation failed');
      res.status(500).json({ error: 'Exam attempt creation failed' });
    }
  } catch (error) {
    console.error('Error creating exam attempt:', error);
    res.status(500).json({ error: 'Exam attempt creation failed', details: error.message });
  }
}

module.exports = {
  handleAttemptCreate,
};
