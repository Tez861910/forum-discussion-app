const { query } = require('../../../db');

async function handleCategoryCreate(req, res) {
  const { categoryName } = req.body;

  try {
    const sql = 'INSERT INTO ExamCategory (CategoryName) VALUES (?)';
    const [result] = await query(sql, [categoryName]);

    if (result.affectedRows === 1) {
      console.log('Exam category created successfully');
      res.json({ message: 'Exam category created successfully' });
    } else {
      console.error('Exam category creation failed');
      res.status(500).json({ error: 'Exam category creation failed' });
    }
  } catch (error) {
    console.error('Error creating exam category:', error);
    res.status(500).json({ error: 'Exam category creation failed', details: error.message });
  }
}

module.exports = {
  handleCategoryCreate,
};
