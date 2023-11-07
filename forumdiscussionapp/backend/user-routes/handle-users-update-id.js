const { query } = require('../db');

async function handleUsersUpdateId(req, res) {
  const { id } = req.params;
  const userData = req.body;
  const userCourseData = userData.usercourses; 
  const userRoleData = userData.userroles; 

  try {
    if (!userData.UserName || !userData.UserEmail) {
      console.log('User Data is required');
      return res.status(400).json({ error: 'User Data is required' });
    }

    // Create an SQL query dynamically based on the provided user data
    const updateFields = [];
    const values = [];
    
    for (const key in userData) {
      if (userData.hasOwnProperty(key) && key !== 'UserID') {
        updateFields.push(`${key} = ?`);
        values.push(userData[key]);
      }
    }

    if (values.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE UserID = ?`;
    values.push(id);

    const [result] = await query(sql, values);

    if (result.affectedRows === 1) {
      console.log('User updated successfully');

      // Update usercourses and userroles tables
      if (userCourseData && userCourseData.length > 0) {
        
        const userCoursesSql = 'UPDATE usercourses SET ... WHERE UserID = ?';
        await query(userCoursesSql, [userCourseData, id]);
      }

      if (userRoleData && userRoleData.length > 0) {
        
        const userRolesSql = 'UPDATE userroles SET ... WHERE UserID = ?';
        await query(userRolesSql, [userRoleData, id]);
      }

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
  handleUsersUpdateId,
};
