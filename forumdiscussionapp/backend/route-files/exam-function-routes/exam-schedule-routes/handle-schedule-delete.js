const { query } = require('../../../db');

async function handleScheduleDelete(req, res) {
  const { scheduleId } = req.params;

  try {
    const sql = 'DELETE FROM ExamSchedule WHERE ScheduleID = ?';
    const [result] = await query(sql, [scheduleId]);

    if (result.affectedRows === 1) {
      console.log('Exam schedule deleted successfully');
      res.json({ message: 'Exam schedule deleted successfully' });
    } else {
      console.error('Exam schedule deletion failed');
      res.status(500).json({ error: 'Exam schedule deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting exam schedule:', error);
    res.status(500).json({ error: 'Exam schedule deletion failed', details: error.message });
  }
}

module.exports = {
  handleScheduleDelete,
};
