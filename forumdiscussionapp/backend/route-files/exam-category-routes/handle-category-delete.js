const { query } = require('../../db');

async function handleCategoryDelete(req, res) {
  const { categoryId } = req.params;

  try {
    const sql = 'DELETE FROM ExamCategory WHERE CategoryID = ?';
    const [result] = await query(sql, [categoryId]);

    if (result.affectedRows === 1) {
      console.log('Exam category deleted successfully');
      res.json({ message: 'Exam category deleted successfully' });
    } else {
      console.error('Exam category deletion failed');
      res.status(500).json({ error: 'Exam category deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting exam category:', error);
    res.status(500).json({ error: 'Exam category deletion failed', details: error.message });
  }
}

module.exports = {
  handleCategoryDelete,
};
