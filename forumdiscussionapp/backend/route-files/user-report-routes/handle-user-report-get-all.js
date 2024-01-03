const { query } = require('../../db');

async function handleUserReportGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM UserReports';
    const [result] = await query(sql);

    console.log('User reports retrieved successfully');
    res.json({ userReports: result });
  } catch (error) {
    console.error('Error getting user reports:', error);
    res.status(500).json({ error: 'Error getting user reports', details: error.message });
  }
}

module.exports = {
  handleUserReportGetAll,
};
