const { query } = require('../../../db');

async function handleForumPostUpdateById(req, res) {
  const { forumPostId } = req.params;
  const { postContent } = req.body;

  try {
    if (!postContent) {
      console.log('PostContent is required for update');
      return res.status(400).json({ error: 'PostContent is required for update' });
    }

    const sql = 'UPDATE ForumsPosts SET PostContent = ? WHERE ForumPostID = ?';
    const [result] = await query(sql, [postContent, forumPostId]);

    if (result.affectedRows === 1) {
      console.log('Forum post updated successfully');
      res.json({ message: 'Forum post updated successfully' });
    } else {
      console.error('Forum post update failed');
      res.status(500).json({ error: 'Forum post update failed' });
    }
  } catch (error) {
    console.error('Error updating forum post:', error);
    res.status(500).json({ error: 'Forum post update failed', details: error.message });
  }
}

module.exports = {
  handleForumPostUpdateById,
};
