const { query } = require('../../db');

async function handleCategoryGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM ExamCategory';
    const [result] = await query(sql);

    console.log('Exam categories retrieved successfully');
    res.json({ examCategories: result });
  } catch (error) {
    console.error('Error getting exam categories:', error);
    res.status(500).json({ error: 'Error getting exam categories', details: error.message });
  }
}

module.exports = {
  handleCategoryGetAll,
};
