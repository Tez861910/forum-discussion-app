const { query } = require('../../db');

async function handleReactionTypeUpdate(req, res) {
  const { reactionTypeId } = req.params;
  const { reactionTypeName } = req.body;

  try {
    if (!reactionTypeName) {
      console.log('ReactionTypeName is required');
      return res.status(400).json({ error: 'ReactionTypeName is required' });
    }

    const sql = 'UPDATE ReactionType SET ReactionTypeName = ? WHERE ReactionTypeID = ?';
    const [result] = await query(sql, [reactionTypeName, reactionTypeId]);

    if (result.affectedRows === 1) {
      console.log('ReactionType updated successfully');
      res.json({ message: 'ReactionType updated successfully' });
    } else {
      console.error('ReactionType update failed');
      res.status(500).json({ error: 'ReactionType update failed' });
    }
  } catch (error) {
    console.error('Error updating reaction type:', error);
    res.status(500).json({ error: 'ReactionType update failed', details: error.message });
  }
}

module.exports = {
  handleReactionTypeUpdate,
};
