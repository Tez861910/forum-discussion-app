const { query } = require('../../../db');

async function handleForumModeratorDeleteById(req, res) {
  const { forumModeratorId } = req.params;

  try {
    const sql = 'DELETE FROM ForumsModerators WHERE ForumModeratorID = ?';
    const [result] = await query(sql, [forumModeratorId]);

    if (result.affectedRows === 1) {
      console.log('Forum moderator deleted successfully');
      res.json({ message: 'Forum moderator deleted successfully' });
    } else {
      console.error('Forum moderator deletion failed');
      res.status(500).json({ error: 'Forum moderator deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting forum moderator:', error);
    res.status(500).json({ error: 'Error deleting forum moderator', details: error.message });
  }
}

module.exports = {
  handleForumModeratorDeleteById,
};
