const { query } = require('../db');
const { createToken, hashPassword } = require('../authvalid');

async function handleUsersCreate(req, res) {
  const { name, email, password, roleId } = req.body;

  try {
    if (!name || !email || !password || !roleId) {
      console.log('Missing user data');
      return res.status(400).json({ error: 'Missing user data' });
    }

    const hashedPassword = await hashPassword(password);

    const sqluser = 'INSERT INTO users (UserName, UserEmail, UserPassword, RoleID) VALUES (?, ?, ?, ?)';
    const [userResult] = await query(sqluser, [name, email, hashedPassword, roleId]);

    if (userResult.affectedRows === 1) {
      const userId = userResult.insertId;

      // Insert a record into userroles to associate the user with the role
      const sqluserroles = 'INSERT INTO userroles (UserID, RoleID) VALUES (?, ?)';
      const [userRolesResult] = await query(sqluserroles, [userId, roleId]);

      if (userRolesResult.affectedRows === 1) {
        const payload = {
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
  } catch (error) {
    console.error('Error during creation:', error);
    res.status(500).json({ error: 'User Creation Failed', details: error.message });
  }
};




module.exports = {
  handleUsersCreate,
};
