const { query } = require('../../db');

async function handlePollGet(req, res) {
  try {
    const sql = 'SELECT * FROM Polls';
    const [result] = await query(sql);

    console.log('Polls retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting polls:', error);
    res.status(500).json({ error: 'Error getting polls', details: error.message });
  }
}

module.exports = {
  handlePollGet,
};
