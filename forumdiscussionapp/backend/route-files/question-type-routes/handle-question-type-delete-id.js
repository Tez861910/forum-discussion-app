const { query } = require('../../db');

async function handleQuestionTypeDeleteById(req, res) {
  const { questionTypeId } = req.params;

  try {
    const sql = 'DELETE FROM QuestionType WHERE QuestionTypeID = ?';
    const [result] = await query(sql, [questionTypeId]);

    if (result.affectedRows === 1) {
      console.log('Question type deleted successfully');
      res.json({ message: 'Question type deleted successfully' });
    } else {
      console.error('Question type deletion failed');
      res.status(500).json({ error: 'Question type deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting question type:', error);
    res.status(500).json({ error: 'Error deleting question type', details: error.message });
  }
}

module.exports = {
  handleQuestionTypeDeleteById,
};
