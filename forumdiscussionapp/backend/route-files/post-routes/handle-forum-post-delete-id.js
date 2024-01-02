const { query } = require('../../db');

async function handleForumPostDeleteById(req, res) {
  const { forumPostId } = req.params;

  try {
    const sql = 'DELETE FROM ForumsPosts WHERE ForumPostID = ?';
    const [result] = await query(sql, [forumPostId]);

    if (result.affectedRows === 1) {
      console.log('Forum post deleted successfully');
      res.json({ message: 'Forum post deleted successfully' });
    } else {
      console.error('Forum post deletion failed');
      res.status(500).json({ error: 'Forum post deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting forum post:', error);
    res.status(500).json({ error: 'Error deleting forum post', details: error.message });
  }
}

module.exports = {
  handleForumPostDeleteById,
};
