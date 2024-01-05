const { query } = require('../../../db');

async function handleUserSettingsUpdate(req, res) {
  const { settingId } = req.params;
  const { theme, darkMode, language, emailNotifications } = req.body;

  try {
    const sql =
      'UPDATE UserSettings SET Theme = ?, DarkMode = ?, Language = ?, EmailNotifications = ? WHERE SettingID = ?';
    const [result] = await query(sql, [theme, darkMode, language, emailNotifications, settingId]);

    if (result.affectedRows === 1) {
      console.log('User settings updated successfully');
      res.json({ message: 'User settings updated successfully' });
    } else {
      console.error('User settings update failed');
      res.status(500).json({ error: 'User settings update failed' });
    }
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'User settings update failed', details: error.message });
  }
}

module.exports = {
  handleUserSettingsUpdate,
};
