const { query } = require('../../db');

async function handleExamDeleteById(req, res) {
  const { examId } = req.params;

  try {
    const sql = 'DELETE FROM Exam WHERE ExamID = ?';
    const [result] = await query(sql, [examId]);

    if (result.affectedRows === 1) {
      console.log('Exam deleted successfully');
      res.json({ message: 'Exam deleted successfully' });
    } else {
      console.error('Exam deletion failed');
      res.status(500).json({ error: 'Exam deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ error: 'Error deleting exam', details: error.message });
  }
}

module.exports = {
  handleExamDeleteById,
};
