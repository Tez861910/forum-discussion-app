const { query } = require('../../../db');

async function handleExamCreate(req, res) {
  const { examName, examStatus, examDuration, instructions, courseId, createdByUserId } = req.body;

  try {
    if (!examName || !courseId || !createdByUserId) {
      console.log('ExamName, CourseID, and CreatedByUserID are required');
      return res.status(400).json({ error: 'ExamName, CourseID, and CreatedByUserID are required' });
    }

    const sql = 'INSERT INTO Exam (ExamName, ExamStatus, ExamDuration, Instructions, CourseID, CreatedByUserID) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await query(sql, [examName, examStatus, examDuration, instructions, courseId, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Exam created successfully');
      res.json({ message: 'Exam created successfully' });
    } else {
      console.error('Exam creation failed');
      res.status(500).json({ error: 'Exam creation failed' });
    }
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Exam creation failed', details: error.message });
  }
}

module.exports = {
  handleExamCreate,
};
