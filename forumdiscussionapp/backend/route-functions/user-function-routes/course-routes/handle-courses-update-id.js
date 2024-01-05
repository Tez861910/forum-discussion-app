const { query } = require('../../../db');

async function handleCoursesUpdateId(req, res) {
  const { id } = req.params;
  const { courseName, courseDescription } = req.body;
  const updatedByUserID = req.user.id; 

  try {
    if (!courseName && !courseDescription) {
      console.log('At least one of CourseName or CourseDescription is required');
      return res.status(400).json({
        error: 'At least one of CourseName or CourseDescription is required'
      });
    }

    // Build the SET clause dynamically based on provided data
    const setClause = [];
    const values = [];

    if (courseName) {
      setClause.push('CourseName = ?');
      values.push(courseName);
    }

    if (courseDescription) {
      setClause.push('CourseDescription = ?');
      values.push(courseDescription);
    }

    // Updated SQL query to consider IsDeleted from CommonAttributes table
    const sql = `
      UPDATE Courses AS C
      INNER JOIN CommonAttributes AS CA ON C.CommonAttributeID = CA.AttributeID
      SET ${setClause.join(', ')}, CA.UpdatedAt = CURRENT_TIMESTAMP, CA.UpdatedByUserID = ?
      WHERE C.CourseID = ? AND CA.IsDeleted = FALSE
    `;

    const updatedValues = [updatedByUserID, ...values, id];
    const [result] = await query(sql, updatedValues);

    if (result.affectedRows === 1) {
      console.log('Course updated successfully');
      res.json({ message: 'Course updated successfully' });
    } else {
      console.error('Course update failed');
      res.status(500).json({ error: 'Course update failed' });
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Course update failed', details: error.message });
  }
}

module.exports = {
  handleCoursesUpdateId,
};
