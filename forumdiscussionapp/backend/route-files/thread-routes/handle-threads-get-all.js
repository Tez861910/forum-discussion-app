const { query } = require('../../db');

async function handleThreadsGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM Threads';
    const results = await query(sql);
    console.log('All Threads data:', results);

    if (results && results.length > 0) {
      
      res.json(results);
    } else {
      res.status(404).json({ error: 'No threads found' });
    }
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ error: 'Thread retrieval failed', details: error.message });
  }
}

module.exports = {
  handleThreadsGetAll,
};
