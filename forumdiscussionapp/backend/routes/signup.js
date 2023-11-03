const express = require('express');
const router = express.Router();
const { createToken, hashPassword } = require('../authvalid');
const { query } = require('../db'); 
const app = express();
app.use(express.json());

router.post('/signup', async (req, res) => {
  const { name, email, password, roleId, courseId } = req.body;

  try {
    if (!name || !email || !password || !roleId || !courseId) {
      console.log('Missing user data');
      return res.status(400).json({ error: 'Missing user data' });
    }

    const hashedPassword = await hashPassword(password);

    // First, insert the user's data into the Users table
    const sqluser = 'INSERT INTO users (UserName, UserEmail, UserPassword, RoleID, CourseID) VALUES (?, ?, ?, ?, ?)';
    const [userResult] = await query(sqluser, [name, email, hashedPassword, roleId, courseId]);

    if (userResult.affectedRows === 1) {
      const userId = userResult.insertId;

      // Now, insert a record into UserCourses to associate the user with the course
      const sqlusercourse = 'INSERT INTO usercourses (UserID, CourseID) VALUES (?, ?)';
      const [userCourseResult] = await query(sqlusercourse, [userId, courseId]);

      if (userCourseResult.affectedRows === 1) {
        // Insert a record into UserRoles to associate the user with the role
        const sqluserroles = 'INSERT INTO userroles (UserID, RoleID) VALUES (?, ?)';
        const [userRolesResult] = await query(sqluserroles, [userId, roleId]);

        if (userRolesResult.affectedRows === 1) {
          const payload = {
            userId,
            email,
            roleId,
          };
          const token = createToken(payload);
          console.log('User registered successfully for email: ' + email);
          res.json({ message: 'User registered successfully', token });
        } else {
          console.log('User registration failed for email: ' + email);
          res.status(500).json({ error: 'User registration failed' });
        }
      } else {
        console.log('User registration failed for email: ' + email);
        res.status(500).json({ error: 'User registration failed' });
      }
    } else {
      console.log('User registration failed for email: ' + email);
      res.status(500).json({ error: 'User registration failed' });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Signup failed', details: error.message });
  }
});

module.exports = router;
