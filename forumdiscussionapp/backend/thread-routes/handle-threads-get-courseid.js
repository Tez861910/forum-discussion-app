const { query } = require('../db');

async function handleThreadsGetCourseIds(req, res) {
  const courseIds = req.params.courseIds.split(',');
  console.log('Received courseIds:', courseIds);

  try {
    const sql = 'SELECT * FROM threads WHERE CourseID IN (?)';
    const results = await query(sql, [courseIds]);
    console.log('Threads data:', results);

    // Send threads as an array
    res.json([results]);
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ error: 'Thread retrieval failed', details: error.message });
  }
}

module.exports = {
  handleThreadsGetCourseIds,
};
