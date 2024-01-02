const { query } = require('../../db');

async function handleAnswerDeleteById(req, res) {
  const { answerId } = req.params;

  try {
    const sql = 'DELETE FROM Answer WHERE AnswerID = ?';
    const [result] = await query(sql, [answerId]);

    if (result.affectedRows === 1) {
      console.log('Answer deleted successfully');
      res.json({ message: 'Answer deleted successfully' });
    } else {
      console.error('Answer deletion failed');
      res.status(500).json({ error: 'Answer deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting answer:', error);
    res.status(500).json({ error: 'Error deleting answer', details: error.message });
  }
}

module.exports = {
  handleAnswerDeleteById,
};
