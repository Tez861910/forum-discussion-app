const { query } = require('../../db');

async function handleAnswersGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM Answer';
    const [result] = await query(sql);

    console.log('Answers retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting answers:', error);
    res.status(500).json({ error: 'Error getting answers', details: error.message });
  }
}

module.exports = {
  handleAnswersGetAll,
};
