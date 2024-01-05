const { query } = require('../../../db');

async function handleResultDelete(req, res) {
  const { resultId } = req.params;

  try {
    const sql = 'DELETE FROM Results WHERE ResultID = ?';
    const [result] = await query(sql, [resultId]);

    if (result.affectedRows === 1) {
      console.log('Exam result deleted successfully');
      res.json({ message: 'Exam result deleted successfully' });
    } else {
      console.error('Exam result deletion failed');
      res.status(500).json({ error: 'Exam result deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting exam result:', error);
    res.status(500).json({ error: 'Exam result deletion failed', details: error.message });
  }
}

module.exports = {
  handleResultDelete,
};
