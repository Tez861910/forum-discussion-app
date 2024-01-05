const { query } = require('../../../db');

async function handleUserResponsesGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM UserResponses';
    const [result] = await query(sql);

    console.log('User responses retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting user responses:', error);
    res.status(500).json({ error: 'Error getting user responses', details: error.message });
  }
}

module.exports = {
  handleUserResponsesGetAll,
};
