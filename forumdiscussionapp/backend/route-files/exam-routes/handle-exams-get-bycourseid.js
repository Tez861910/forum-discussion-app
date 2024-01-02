const { query } = require('../../db');

async function handleExamGetByCourseId(req, res) {
  const { courseId } = req.params;

  try {
    const sql = 'SELECT * FROM Exam WHERE CourseID = ?';
    const [result] = await query(sql, [courseId]);

    console.log('Exams retrieved successfully for CourseID:', courseId);
    res.json(result);
  } catch (error) {
    console.error('Error getting exams for CourseID:', courseId, error);
    res.status(500).json({ error: 'Error getting exams', details: error.message });
  }
}

module.exports = {
  handleExamGetByCourseId,
};
