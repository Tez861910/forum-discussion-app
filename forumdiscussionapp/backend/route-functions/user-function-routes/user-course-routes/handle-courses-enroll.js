import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handleCoursesEnroll = async (req, res) => {
  const { userId, courseIds } = req.body;

  try {
    // Dynamically access the UserCourses and CommonAttributes models using sequelize.models
    const UserCourses = sequelize.models.UserCourses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Check if any user is already enrolled in any of the selected courses
    const existingEnrollments = await UserCourses.findAll({
      where: {
        UserID: userId,
        CourseID: { [Op.in]: courseIds },
      },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    if (existingEnrollments && existingEnrollments.length > 0) {
      return res.status(400).json({
        error: "The user is already enrolled in one or more selected courses",
      });
    }

    // Enroll the user in all selected courses using new UserCoursesAttributeID for each
    const enrollments = [];
    const enrollmentDate = new Date();

    for (const courseId of courseIds) {
      // Create a new CommonAttributes entry for each enrollment
      const commonAttributes = await CommonAttributes.create({
        CreatedByUserID: userId,
      });

      // Enroll the user in the course using the new CommonAttributeID
      enrollments.push({
        UserID: userId,
        CourseID: courseId,
        EnrollmentDate: enrollmentDate,
        CommonAttributeID: commonAttributes.AttributeID,
      });
    }

    // Bulk create the enrollments
    await UserCourses.bulkCreate(enrollments);

    console.log("User enrolled in the selected courses successfully");
    res.json({ message: "User enrolled in the selected courses successfully" });
  } catch (error) {
    console.error("Error enrolling user in courses:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
