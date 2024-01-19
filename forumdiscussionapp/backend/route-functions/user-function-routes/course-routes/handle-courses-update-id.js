import { sequelize } from "../../../db.js";

export const handleCoursesUpdateId = async (req, res) => {
  const { id } = req.params;
  const { courseName, courseDescription } = req.body;
  const updatedByUserID = req.user.id;

  try {
    // Dynamically access the models using sequelize.models
    const Courses = sequelize.models.Courses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    if (!courseName && !courseDescription) {
      console.log(
        "At least one of CourseName or CourseDescription is required"
      );
      return res.status(400).json({
        error: "At least one of CourseName or CourseDescription is required",
      });
    }

    // Fetch the course with the provided ID
    const course = await Courses.findOne({
      where: { CourseID: id },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
        },
      ],
    });

    if (!course) {
      console.error("Course not found");
      return res.status(404).json({ error: "Course not found" });
    }

    // Update the course
    course.CourseName = courseName;
    course.CourseDescription = courseDescription;
    await course.save();

    // Update the associated CommonAttributes entry with UpdatedByUserID
    const commonAttributes = await CommonAttributes.findOne({
      where: { AttributeID: course.CommonAttributeID },
    });

    commonAttributes.UpdatedAt = new Date();
    commonAttributes.UpdatedByUserID = updatedByUserID;

    // Save the changes
    await commonAttributes.save();

    console.log("Course updated successfully");
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      error: "Course update failed",
      details: error.message,
    });
  }
};
