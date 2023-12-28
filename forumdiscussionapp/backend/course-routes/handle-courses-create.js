const { query } = require('../db');

async function handleCoursesCreate(req, res) {
  const { courseName, courseDescription, createdByUserID } = req.body;

  try {
    // Input Validation
    if (!courseName || !createdByUserID) {
      console.log('Course name and createdByUserID are required');
      return res.status(400).json({ error: 'Course name and createdByUserID are required' });
    }

    // Step 1: Create a Common Attribute entry
    const commonAttributeSql = 'INSERT INTO CommonAttributes (CreatedByUserID) VALUES (?)';
    const [commonAttributeResult] = await query(commonAttributeSql, [createdByUserID]);

    // Check Common Attribute Creation Result
    if (commonAttributeResult.affectedRows !== 1) {
      console.error('Common Attribute creation failed');
      return res.status(500).json({ error: 'Common Attribute creation failed' });
    }

    const commonAttributeID = commonAttributeResult.insertId;

    // Step 2: Insert the course with the generated CommonAttributeID
    const courseSql = `
      INSERT INTO Courses (CourseName, CourseDescription, CommonAttributeID)
      VALUES (?, ?, ?)
    `;

    const [courseResult] = await query(courseSql, [courseName, courseDescription, commonAttributeID]);

    // Check Course Creation Result
    if (courseResult.affectedRows === 1) {
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

module.exports = {
  handleCoursesCreate,
};
