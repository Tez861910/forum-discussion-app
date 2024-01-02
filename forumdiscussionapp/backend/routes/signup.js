const express = require('express');
const router = express.Router();
const { createToken, hashPassword, createRefreshToken } = require('../authvalid');
const { query } = require('../db');
const { validateSignup } = require('../body-validation/signup-validation');

const app = express();
app.use(express.json());

router.post('/signup', async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    phoneNumber,
    dateOfBirth,
    genderID,
  } = req.body;

  try {

     // Validate request body
     const validationResult = validateSignup({
      name,
      email,
      password,
      address,
      phoneNumber,
      dateOfBirth,
      genderID,
    });

    if (!name || !email || !password || !genderID) {
      console.log('Missing user data');
      return res.status(400).json({ error: 'Missing user data' });
    }

    // Check if the provided gender is valid
    const checkGenderSql = 'SELECT * FROM Gender WHERE GenderID = ?';
    const [genderResult] = await query(checkGenderSql, [genderID]);

    if (!Array.isArray(genderResult) || genderResult.length === 0) {
      console.log('Invalid gender ID');
      return res.status(400).json({ error: 'Invalid gender ID' });
    }

    const userData = {
      UserName: name,
      UserEmail: email,
      UserPassword: await hashPassword(password),
      PhoneNumber: phoneNumber || null,
      Address: address || null,
      DateOfBirth: dateOfBirth || null,
      GenderID: genderID,
    };

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const insertUserSql = 'INSERT INTO Users SET ?';
    const [userResult] = await query(insertUserSql, [userData]);

    if (userResult.affectedRows === 1) {
      const userId = userResult.insertId;

      const studentRoleId = 3;
      const insertUserRoleSql = 'INSERT INTO UserRoles (UserID, RoleID) VALUES (?, ?)';
      const [userRolesResult] = await query(insertUserRoleSql, [userId, studentRoleId]);

      if (userRolesResult.affectedRows === 1) {
        const payload = {
          email,
          roleId: studentRoleId,
        };
        const token = createToken(payload);
        const refreshToken = createRefreshToken(payload);
        console.log('User registered successfully for email: ' + email);
        res.json({ message: 'User registered successfully', token, refreshToken });
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
