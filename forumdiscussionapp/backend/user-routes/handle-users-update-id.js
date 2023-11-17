const { query } = require('../db');
const { hashPassword } = require('../authvalid');

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

    // Hash the password if provided
    if (userData.UserPassword) {
      const hashedPassword = await hashPassword(userData.UserPassword);
      updateFields.push('UserPassword = ?');
      values.push(hashedPassword);
    }

    values.push(id);

    // Update the user and associated records only if not soft deleted
    const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE UserID = ? AND IsDeleted = FALSE`;

    const [result] = await query(sql, values);

    if (result.affectedRows === 1) {
      console.log('User updated successfully');

      // Update usercourses table
      if (userCourseData && userCourseData.length > 0) {
        const userCoursesSql = 'UPDATE usercourses SET CourseID = ? WHERE UserID = ? AND IsDeleted = FALSE';
        for (const course of userCourseData) {
          await query(userCoursesSql, [course.CourseID, id]);
        }
      }

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
