const { query } = require('../db');

async function handleThreadsGetByThreadId(req, res) {
  const { threadId } = req.params;

  try {
    const sql = 'SELECT * FROM Threads WHERE ThreadID = ?';
    const results = await query(sql, [threadId]);

    console.log('Thread by ID data:', results);

    if (results && results.length > 0) {
      res.json({ thread: results[0] });
    } else {
      res.status(404).json({ error: 'Thread not found' });
    }
  } catch (error) {
    console.error('Error fetching thread by ID:', error);
    res.status(500).json({ error: 'Thread retrieval failed', details: error.message });
  }
}

module.exports = {
  handleThreadsGetByThreadId,
};
