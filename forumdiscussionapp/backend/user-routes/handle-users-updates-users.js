const { query } = require('../db');
const { hashPassword } = require('../authvalid');

async function handleUsersUpdateUsers(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    if (!userData.name && !userData.email && !userData.password) {
      console.log('No valid fields provided for update');
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    // Create an SQL query dynamically based on the provided user data
    const updateFields = [];
    const values = [];

    if (userData.name) {
      updateFields.push('UserName = ?');
      values.push(userData.name);
    }

    if (userData.email) {
      updateFields.push('UserEmail = ?');
      values.push(userData.email);
    }

    // Hash the password if provided
    if (userData.password) {
      const hashedPassword = await hashPassword(userData.password);
      updateFields.push('UserPassword = ?');
      values.push(hashedPassword);
    }

    values.push(id);

    if (updateFields.length === 0) {
      console.log('No valid fields provided for update');
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE UserID = ?`;

    const [result] = await query(sql, values);

    if (result.affectedRows === 1) {
      console.log('User updated successfully');
      res.json({ message: 'User updated successfully' });
    } else {
      console.error('User update failed');
      res.status(500).json({ error: 'User update failed' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'User update failed', details: error.message });
  }
}

module.exports = {
  handleUsersUpdateUsers,
};
