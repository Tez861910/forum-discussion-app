const { query } = require('../../../db');

async function handleForumGetById(req, res) {
  const { forumId } = req.params;

  try {
    const sql = 'SELECT * FROM Forums WHERE ForumID = ?';
    const [result] = await query(sql, [forumId]);

    if (result.length === 1) {
      console.log('Forum retrieved successfully');
      res.json(result[0]);
    } else {
      console.error('Forum not found');
      res.status(404).json({ error: 'Forum not found' });
    }
  } catch (error) {
    console.error('Error getting forum:', error);
    res.status(500).json({ error: 'Error getting forum', details: error.message });
  }
}

module.exports = {
  handleForumGetById,
};
