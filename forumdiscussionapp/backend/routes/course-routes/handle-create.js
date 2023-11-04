
export async function handleCreate(req, res) {
    {
        const { courseName } = req.body;
      
        try {
          if (!courseName) {
            console.log('Course name is required');
            return res.status(400).json({ error: 'Course name is required' });
          }
      
          const sql = 'INSERT INTO courses (CourseName) VALUES (?)';
          const [result] = await query(sql, [courseName]);
      
          if (result.affectedRows === 1) {
            console.log('Course created successfully');
            res.json({ message: 'Course created successfully' });
          } else {
            console.error('Course creation failed');
            res.status(500).json({ error: 'Course creation failed' });
          }
        } catch (error) {
          console.error('Error creating course:', error);
          res.status(500).json({ error: 'Course creation failed', details: error.message });
        }
      }
}