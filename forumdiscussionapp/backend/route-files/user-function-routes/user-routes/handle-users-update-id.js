const { query } = require('../../../db');
const { hashPassword } = require('../../../authvalid');

async function handleUsersUpdateId(req, res) {
  const { id } = req.params;
  const userData = req.body;
  const userRoleData = userData.userroles;
  const { updatedByUserId } = req.body; 

  try {
    if (!userData.UserName || !userData.UserEmail || !updatedByUserId) {
      console.log('User Data and UpdatedByUserId are required');
      return res.status(400).json({ error: 'User Data and UpdatedByUserId are required' });
    }

    // Create an SQL query dynamically based on the provided user data
    const updateFields = [];
    const values = [];

    for (const key in userData) {
      if (userData.hasOwnProperty(key) && key !== 'UserID' && key !== 'UserPassword') {
        // Check if the field is provided and not empty (for fields like UserPassword)
        if (userData[key] !== null && userData[key] !== undefined) {
          updateFields.push(`${key} = ?`);
          values.push(userData[key]);
        }
      }
    }

    if (values.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    // Hash the password if provided
    if (userData.UserPassword) {
      const hashedPassword = await hashPassword(userData.UserPassword);
      updateFields.push('UserPassword = ?');
      values.push(hashedPassword);
    }

    values.push(updatedByUserId, id);

    // Update the user and associated records only if not soft deleted
    const sql = `
      UPDATE users
      SET ${updateFields.join(', ')},
          UpdatedAt = NOW(),
          UpdatedByUserID = ?
      WHERE UserID = ?
        AND CommonAttributeID IN (SELECT AttributeID FROM CommonAttributes WHERE IsDeleted = FALSE)
        AND IsDeleted = FALSE
    `;

    const [result] = await query(sql, values);

    if (result.affectedRows === 1) {
      console.log('User updated successfully');

      // Update userroles table
      if (userRoleData && userRoleData.length > 0) {
        const userRolesSql = 'UPDATE userroles SET RoleID = ? WHERE UserID = ? AND IsDeleted = FALSE';
        for (const role of userRoleData) {
          await query(userRolesSql, [role.RoleID, id]);
        }
      }

      res.json({ message: 'User updated successfully' });
    } else {
      console.error('User update failed');
      res.status(500).json({ error: 'User update failed' });
    }
  } catch (error) {
    console.error('Error updating user and associated records:', error);
    res.status(500).json({ error: 'User update failed', details: error.message });
  }
}

module.exports = {
  handleUsersUpdateId,
};
