const { query } = require('../../../db');

async function handleScheduleUpdate(req, res) {
  const { scheduleId } = req.params;
  const { examId, startTime, endTime, createdByUserId } = req.body;

  try {
    const sql = 'UPDATE ExamSchedule SET ExamID = ?, StartTime = ?, EndTime = ?, CreatedByUserID = ? WHERE ScheduleID = ?';
    const [result] = await query(sql, [examId, startTime, endTime, createdByUserId, scheduleId]);

    if (result.affectedRows === 1) {
      console.log('Exam schedule updated successfully');
      res.json({ message: 'Exam schedule updated successfully' });
    } else {
      console.error('Exam schedule update failed');
      res.status(500).json({ error: 'Exam schedule update failed' });
    }
  } catch (error) {
    console.error('Error updating exam schedule:', error);
    res.status(500).json({ error: 'Exam schedule update failed', details: error.message });
  }
}

module.exports = {
  handleScheduleUpdate,
};
