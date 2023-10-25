const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection
const { hashPassword } = require('../authvalid'); // Import password functions

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, password, roleID, courseId } = req.body;

  try {
    if (!name || !email || !password || !roleID || !courseId) {
      return res.status(400).json({ error: 'Missing user data' });
    }

    // Hash the password using Argon2
    const hashedPassword = await hashPassword(password);

    const sql = 'INSERT INTO users (UserName, UserEmail, UserPassword, RoleID, CourseID) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, hashedPassword, roleID, courseId];

    await db.query(sql, values); // Use 'await' for async query execution

    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ error: 'User creation failed' });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, roleID, courseId } = req.body;

  try {
    if (!name || !email || !roleID || !courseId) {
      return res.status(400).json({ error: 'Missing user data' });
    }

    let hashedPassword;
    if (password) {
      // If a new password is provided, hash it
      hashedPassword = await hashPassword(password);
      const updateSql = 'UPDATE users SET UserName = ?, UserEmail = ?, UserPassword = ?, RoleID = ?, CourseID = ? WHERE UserID = ?';
      const updateValues = [name, email, hashedPassword, roleID, courseId, userId];
      await db.query(updateSql, updateValues);
    } else {
      // If no new password is provided, update other fields
      const updateSql = 'UPDATE users SET UserName = ?, UserEmail = ?, RoleID = ?, CourseID = ? WHERE UserID = ?';
      const updateValues = [name, email, roleID, courseId, userId];
      await db.query(updateSql, updateValues);
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'User update failed' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM users WHERE UserID = ?';

  db.query(sql, [userId])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    })
    .catch((err) => {
      console.error('Delete user error:', err);
      res.status(500).json({ error: 'User deletion failed' });
    });
});

// Get a list of all users
router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql)
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
    });
});

module.exports = router;
