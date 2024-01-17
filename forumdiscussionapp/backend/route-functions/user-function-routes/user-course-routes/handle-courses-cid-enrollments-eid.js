import { sequelize } from "../../../db.js";

export const handleCIDEnrollmentsEID = async (req, res) => {
  const { courseId, userId } = req.params;
  const { deletedByUserID } = req.body;

  try {
    // Dynamically access the UserCourses and CommonAttributes models using sequelize.models
    const UserCourses = sequelize.models.UserCourses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch the user course for the given user ID and course ID
    const userCourse = await UserCourses.findOne({
      where: { CourseID: courseId, UserID: userId },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    if (!userCourse) {
      return res
        .status(404)
        .json({ error: "Enrollment not found or already removed" });
    }

    // Soft-delete the enrollment
    await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedAt: new Date(),
        DeletedByUserID: deletedByUserID,
      },
      { where: { AttributeID: userCourse.CommonAttributeID } }
    );

    console.log(`User ${userId} soft-deleted from the course ${courseId}.`);
    res.json({ message: "User removed from the course successfully" });
  } catch (error) {
    console.error("Error removing user from course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
