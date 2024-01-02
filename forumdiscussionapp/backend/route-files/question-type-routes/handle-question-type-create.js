const { query } = require('../../db');

async function handleQuestionTypeCreate(req, res) {
  const { questionTypeName } = req.body;

  try {
    if (!questionTypeName) {
      console.log('QuestionTypeName is required');
      return res.status(400).json({ error: 'QuestionTypeName is required' });
    }

    const sql = 'INSERT INTO QuestionType (QuestionTypeName) VALUES (?)';
    const [result] = await query(sql, [questionTypeName]);

    if (result.affectedRows === 1) {
      console.log('Question type created successfully');
      res.json({ message: 'Question type created successfully' });
    } else {
      console.error('Question type creation failed');
      res.status(500).json({ error: 'Question type creation failed' });
    }
  } catch (error) {
    console.error('Error creating question type:', error);
    res.status(500).json({ error: 'Question type creation failed', details: error.message });
  }
}

module.exports = {
  handleQuestionTypeCreate,
};
