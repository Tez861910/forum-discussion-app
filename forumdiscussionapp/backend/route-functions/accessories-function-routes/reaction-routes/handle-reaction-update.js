const { query } = require('../../../db');

async function handleReactionUpdate(req, res) {
  const { reactionId } = req.params;
  const { userId, reactionTypeId, reactedToType, reactedToId, isPositive } = req.body;

  try {
    if (!userId || !reactionTypeId || !reactedToType || !reactedToId || isPositive === undefined) {
      console.log('UserId, ReactionTypeId, ReactedToType, ReactedToId, and IsPositive are required');
      return res.status(400).json({
        error: 'UserId, ReactionTypeId, ReactedToType, ReactedToId, and IsPositive are required',
      });
    }

    const sql =
      'UPDATE Reactions SET ReactionByUserID = ?, ReactionTypeID = ?, ReactedToType = ?, ReactedToID = ?, IsPositive = ? WHERE ReactionID = ?';
    const [result] = await query(sql, [userId, reactionTypeId, reactedToType, reactedToId, isPositive, reactionId]);

    if (result.affectedRows === 1) {
      console.log('Reaction updated successfully');
      res.json({ message: 'Reaction updated successfully' });
    } else {
      console.error('Reaction update failed');
      res.status(500).json({ error: 'Reaction update failed' });
    }
  } catch (error) {
    console.error('Error updating reaction:', error);
    res.status(500).json({ error: 'Reaction update failed', details: error.message });
  }
}

module.exports = {
  handleReactionUpdate,
};
