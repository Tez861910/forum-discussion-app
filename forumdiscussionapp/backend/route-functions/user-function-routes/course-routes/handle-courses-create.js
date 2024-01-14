import { Courses, CommonAttributes } from "../../../db.js";

export const handleCoursesCreate = async (req, res) => {
  const { courseName, courseDescription, createdByUserID } = req.body;

  try {
    // Input Validation
    if (!courseName || !createdByUserID) {
      console.log("Course name and createdByUserID are required");
      return res
        .status(400)
        .json({ error: "Course name and createdByUserID are required" });
    }

    // Step 1: Create a Common Attribute entry
    const commonAttributes = await CommonAttributes.create({
      CreatedByUserID: createdByUserID,
    });

    // Step 2: Insert the course with the generated CommonAttributeID
    const course = await Courses.create({
      CourseName: courseName,
      CourseDescription: courseDescription,
      CommonAttributeID: commonAttributes.AttributeID,
    });

    console.log("Course created successfully");
    res.json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ error: "Course creation failed", details: error.message });
  }
};
