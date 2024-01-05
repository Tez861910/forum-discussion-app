const { query } = require('../../../db');

async function handleThreadsGetCourseId(req, res) {
  const courseId = req.params.courseId;  
  console.log('Received courseId:', courseId);

  try {
    const sql = 'SELECT * FROM threads WHERE CourseID = ?';
    const results = await query(sql, [courseId]);
    console.log('Threads data:', results);

    res.json([results]);
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ error: 'Thread retrieval failed', details: error.message });
  }
}

module.exports = {
  handleThreadsGetCourseId,
};
