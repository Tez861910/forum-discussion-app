const { query } = require('../../db');

async function handleReactionGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM Reactions';
    const [result] = await query(sql);

    console.log('Reactions retrieved successfully');
    res.json({ reactions: result });
  } catch (error) {
    console.error('Error getting reactions:', error);
    res.status(500).json({ error: 'Error getting reactions', details: error.message });
  }
}

module.exports = {
  handleReactionGetAll,
};
