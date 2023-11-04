const express = require('express');
const router = express.Router();
const {query} = require('../db');
const { createToken, hashPassword, verifyPassword } = require('../authvalid');

// Create a new user
router.post('/users/create', async (req, res) => {
  const { name, email, password, roleId, courseId } = req.body;

  try {
    if (!name || !email || !password || !roleId || !courseId) {
      console.log('Name, email, password, roleId, and courseId are required');
      return res.status(400).json({ error: 'Name, email, password, roleId, and courseId are required' });
    }

    // Hash the password using the hashPassword function
    const hashedPassword = await hashPassword(password);

    // SQL query to insert the new user
    const sql = 'INSERT INTO users (UserName, UserEmail, UserPassword, RoleID, CourseID) VALUES (?, ?, ?, ?, ?)';
    const [result] = await query(sql, [name, email, hashedPassword, roleId, courseId]);

    if (result.affectedRows === 1) {
      console.log('User created successfully');
      res.json({ message: 'User created successfully' });
    } else {
      console.error('User creation failed');
      res.status(500).json({ error: 'User creation failed' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'User creation failed', details: error.message });
  }
});

// Get all users
router.get('/users/get', async (req, res) => {
  try {
    const sql = 'SELECT * FROM users';
    const [results] = await query(sql);

    console.log('Users fetched successfully');
    res.json({ users: results });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'User retrieval failed', details: error.message });
  }
});

// Get a user by ID with CourseName and RoleName
router.get('/users/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `
      SELECT 
        users.*,
        courses.CourseName,
        roles.RoleName
      FROM users
      JOIN courses ON users.CourseID = courses.CourseID
      JOIN roles ON users.RoleID = roles.RoleID
      WHERE users.UserID = ?
    `;

    const results = await query(sql, [id]);

    if (results.length > 0) {
      console.log('User fetched successfully');
      res.json({ user: results[0] });
    } else {
      console.error('User not found');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'User retrieval by ID failed', details: error.message });
  }
});


// Update a user
router.put('/users/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body; // Exclude roleId and courseId

  try {
    if (!name || !email) {
      console.log('Name and email are required');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // SQL query to update the user
    const sql = 'UPDATE users SET UserName = ?, UserEmail = ? WHERE UserID = ?';
    const [result] = await query(sql, [name, email, id]);

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
});



// Update a user
router.put('/users/update/admin/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, roleId, courseId } = req.body;

  try {
    if (!name || !email || !roleId || !courseId) {
      console.log('Name, email, roleId, and courseId are required');
      return res.status(400).json({ error: 'Name, email, roleId, and courseId are required' });
    }

    // SQL query to update the user
    const sql = 'UPDATE users SET UserName = ?, UserEmail = ?, RoleID = ?, CourseID = ? WHERE UserID = ?';
    const [result] = await query(sql, [name, email, roleId, courseId, id]);

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
});

// Delete a user
router.delete('/users/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // SQL query to delete the user
    const sql = 'DELETE FROM users WHERE UserID = ?';
    const [result] = await query(sql, [id]);

    if (result.affectedRows === 1) {
      console.log('User deleted successfully');
      res.json({ message: 'User deleted successfully' });
    } else {
      console.error('User deletion failed');
      res.status(500).json({ error: 'User deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'User deletion failed', details: error.message });
  }
});

module.exports = router;
