const { query } = require('../../db');

async function handleQuestionCreate(req, res) {
  const { questionText, questionTypeId, examId, courseId, createdByUserId } = req.body;

  try {
    if (!questionText || !questionTypeId || !examId || !courseId || !createdByUserId) {
      console.log('QuestionText, QuestionTypeId, ExamId, CourseId, and CreatedByUserId are required');
      return res.status(400).json({
        error: 'QuestionText, QuestionTypeId, ExamId, CourseId, and CreatedByUserId are required',
      });
    }

    const sql =
      'INSERT INTO Question (QuestionText, QuestionTypeID, ExamID, CourseID, CreatedByUserID) VALUES (?, ?, ?, ?, ?)';
    const [result] = await query(sql, [questionText, questionTypeId, examId, courseId, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Question created successfully');
      res.json({ message: 'Question created successfully' });
    } else {
      console.error('Question creation failed');
      res.status(500).json({ error: 'Question creation failed' });
    }
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Question creation failed', details: error.message });
  }
}

module.exports = {
  handleQuestionCreate,
};
