const { query } = require('../../db');

async function handleForumReplyUpdateById(req, res) {
  const { forumReplyId } = req.params;
  const { replyContent } = req.body;

  try {
    if (!replyContent) {
      console.log('ReplyContent is required for update');
      return res.status(400).json({ error: 'ReplyContent is required for update' });
    }

    const sql = 'UPDATE ForumsReplies SET ReplyContent = ? WHERE ForumReplyID = ?';
    const [result] = await query(sql, [replyContent, forumReplyId]);

    if (result.affectedRows === 1) {
      console.log('Forum reply updated successfully');
      res.json({ message: 'Forum reply updated successfully' });
    } else {
      console.error('Forum reply update failed');
      res.status(500).json({ error: 'Forum reply update failed' });
    }
  } catch (error) {
    console.error('Error updating forum reply:', error);
    res.status(500).json({ error: 'Forum reply update failed', details: error.message });
  }
}

module.exports = {
  handleForumReplyUpdateById,
};
