const { query } = require('../../db');

async function handleUserReportDelete(req, res) {
  const { reportId } = req.params;

  try {
    const sql = 'DELETE FROM UserReports WHERE ReportID = ?';
    const [result] = await query(sql, [reportId]);

    if (result.affectedRows === 1) {
      console.log('User report deleted successfully');
      res.json({ message: 'User report deleted successfully' });
    } else {
      console.error('User report deletion failed');
      res.status(500).json({ error: 'User report deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting user report:', error);
    res.status(500).json({ error: 'User report deletion failed', details: error.message });
  }
}

module.exports = {
  handleUserReportDelete,
};
