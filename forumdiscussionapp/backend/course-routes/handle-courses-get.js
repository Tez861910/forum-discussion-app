const { query } = require('../db');

 async function handleCoursesGet(req, res) {
    {
        try {
          const sql = 'SELECT * FROM courses WHERE IsDeleted = 0';
          const results = await query(sql);
      
          console.log(results)
      
          if (!results.length) {
            return res.status(404).json({ error: 'No courses found' });
          }
      
          const courseData = results.map(row => ({
            CourseID: row.CourseID,
            CourseName: row.CourseName,
          }));
      
          console.log('Courses fetched successfully');
          res.status(200).json({ courses: courseData });
        } catch (error) {
          console.error('Error fetching courses:', error);
          res.status(500).json({ error: 'Course retrieval failed', details: error.message });
        }
      }
}

module.exports = {
  handleCoursesGet,
};