import { sequelize } from "../../../db.js";

export const handleCoursesPatchId = async (req, res) => {
  const deletedByUserID = req.user.id;
  const { id } = req.params;

  try {
    // Dynamically access the Courses model using sequelize.models
    const Courses = sequelize.models.Courses;

    // Dynamically access the CommonAttributes model using sequelize.models
    const CommonAttributes = sequelize.models.CommonAttributes;

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

    // Soft-delete the course
    const commonAttributes = await CommonAttributes.findOne({
      where: { AttributeID: course.CommonAttributeID },
    });
    commonAttributes.IsDeleted = true;
    commonAttributes.DeletedAt = new Date();
    commonAttributes.DeletedByUserID = deletedByUserID;
    await commonAttributes.save();

    console.log("Course soft-deleted successfully");
    res.json({ message: "Course soft-deleted successfully" });
  } catch (error) {
    console.error("Error soft-deleting course:", error);
    res
      .status(500)
      .json({ error: "Course soft-deletion failed", details: error.message });
  }
};
