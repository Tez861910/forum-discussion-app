const { query } = require('../../../db');

async function handleAttemptDelete(req, res) {
  const { attemptId } = req.params;

  try {
    const sql = 'DELETE FROM ExamAttempt WHERE AttemptID = ?';
    const [result] = await query(sql, [attemptId]);

    if (result.affectedRows === 1) {
      console.log('Exam attempt deleted successfully');
      res.json({ message: 'Exam attempt deleted successfully' });
    } else {
      console.error('Exam attempt deletion failed');
      res.status(500).json({ error: 'Exam attempt deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting exam attempt:', error);
    res.status(500).json({ error: 'Exam attempt deletion failed', details: error.message });
  }
}

module.exports = {
  handleAttemptDelete,
};
