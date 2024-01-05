const { query } = require('../../../db');

async function handleCoursesGet(req, res) {
  try {
    const sql = `
      SELECT c.CourseID, c.CourseName, c.CourseDescription
      FROM Courses c
      JOIN CommonAttributes ca ON c.CommonAttributeID = ca.AttributeID
      WHERE ca.IsDeleted = FALSE
    `;
    const results = await query(sql);

    if (!results.length) {
      return res.status(404).json({ error: 'No courses found' });
    }

    const courseData = results.map(row => ({
      CourseID: row.CourseID,
      CourseName: row.CourseName,
      CourseDescription: row.CourseDescription,
    }));

    console.log('Courses fetched successfully');
    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Course retrieval failed', details: error.message });
  }
}

module.exports = {
  handleCoursesGet,
};
