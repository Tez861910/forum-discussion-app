const { query } = require('../../../db');

async function handleReactionTypeGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM ReactionType';
    const [result] = await query(sql);

    console.log('ReactionTypes retrieved successfully');
    res.json({ reactionTypes: result });
  } catch (error) {
    console.error('Error getting reaction types:', error);
    res.status(500).json({ error: 'Error getting reaction types', details: error.message });
  }
}

module.exports = {
  handleReactionTypeGetAll,
};
