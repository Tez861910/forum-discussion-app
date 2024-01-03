const { query } = require('../../db');

async function handleBanGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM Bans';
    const [result] = await query(sql);

    console.log('Bans retrieved successfully');
    res.json({ bans: result });
  } catch (error) {
    console.error('Error getting bans:', error);
    res.status(500).json({ error: 'Error getting bans', details: error.message });
  }
}

module.exports = {
  handleBanGetAll,
};
