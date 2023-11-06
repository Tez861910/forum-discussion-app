const { query } = require('../db');
                                    
async function handleUsersCreate(req, res) {
    {
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
      } 
    };

    module.exports = {
      handleUsersCreate,
    };