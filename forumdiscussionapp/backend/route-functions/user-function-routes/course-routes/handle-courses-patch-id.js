import { sequelize } from "../../../db.js";

export const handleCoursesPatchId = async (req, res) => {
  const { courseId } = req.params;
  const deletedByUserID = req.body;

  try {
    // Dynamically access the models using sequelize.models
    const Courses = sequelize.models.Courses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch the course with the provided ID
    const course = await Courses.findOne({
      where: { CourseID: courseId },
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

    // Soft-delete the course by updating associated CommonAttributes entry
    const commonAttributes = await CommonAttributes.findOne({
      where: { AttributeID: course.CommonAttributeID },
    });

    commonAttributes.IsDeleted = true;
    commonAttributes.DeletedAt = new Date();
    commonAttributes.DeletedByUserID = parseInt(
      deletedByUserID.deletedByUserID,
      10
    );

    // Save the changes
    await commonAttributes.save();

    console.log("Course soft-deleted successfully");
    res.json({ message: "Course soft-deleted successfully" });
  } catch (error) {
    console.error("Error soft-deleting course:", error);
    res.status(500).json({
      error: "Course soft-deletion failed",
      details: error.message,
    });
  }
};
