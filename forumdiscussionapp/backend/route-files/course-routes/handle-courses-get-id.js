const { query } = require('../../db');

async function handleCoursesGetId(req, res) {
  const { id } = req.params;

  try {
    const sql = `
      SELECT C.CourseID, C.CourseName, C.CourseDescription, CA.IsDeleted
      FROM Courses AS C
      LEFT JOIN CommonAttributes AS CA ON C.CommonAttributeID = CA.AttributeID
      WHERE C.CourseID = ? AND CA.IsDeleted = FALSE
    `;

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

module.exports = {
  handleCoursesGetId,
};
