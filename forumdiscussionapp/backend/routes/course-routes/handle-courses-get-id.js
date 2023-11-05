async function handleCoursesGetId(req, res) {
    {
    const { id } = req.params;
  
    try {
      const sql = 'SELECT * FROM courses WHERE CourseID = ?';
      const [result] = await query(sql, [id]);
  
      if (result.length === 1) {
        console.log('Course fetched successfully');
        res.json({ course: result[0] });
      } else {
        console.error('Course not found');
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ error: 'Course retrieval failed', details: error.message });
    }
  }
};