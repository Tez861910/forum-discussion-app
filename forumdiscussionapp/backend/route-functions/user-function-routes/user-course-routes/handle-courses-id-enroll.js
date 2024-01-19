import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handleCoursesIdEnroll = async (req, res) => {
  const { userIds, courseId } = req.body;

  try {
    // Dynamically access the models using sequelize.models
    const UserCourses = sequelize.models.UserCourses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Check if any user is already enrolled in the selected course
    const existingEnrollments = await UserCourses.findAll({
      where: {
        UserID: { [Op.in]: userIds },
        CourseID: courseId,
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
        error: "One or more users are already enrolled in the selected course",
      });
    }

    // Enroll the users in the selected course
    const enrollments = [];
    const enrollmentDate = new Date();

    for (const userId of userIds) {
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

    console.log("Users enrolled in the selected course successfully");
    res.json({ message: "Users enrolled in the selected course successfully" });
  } catch (error) {
    console.error("Error enrolling users in course:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
