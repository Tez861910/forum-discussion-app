const { query } = require('../../db');

async function handleScheduleCreate(req, res) {
  const { examId, startTime, endTime, createdByUserId } = req.body;

  try {
    const sql = 'INSERT INTO ExamSchedule (ExamID, StartTime, EndTime, CreatedByUserID) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [examId, startTime, endTime, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Exam schedule created successfully');
      res.json({ message: 'Exam schedule created successfully' });
    } else {
      console.error('Exam schedule creation failed');
      res.status(500).json({ error: 'Exam schedule creation failed' });
    }
  } catch (error) {
    console.error('Error creating exam schedule:', error);
    res.status(500).json({ error: 'Exam schedule creation failed', details: error.message });
  }
}

module.exports = {
  handleScheduleCreate,
};
