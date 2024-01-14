import { UserCourses, CommonAttributes } from "../../../db.js";
import { Op } from "sequelize";

export const handleCoursesIdEnroll = async (req, res) => {
  const { userIds, courseId } = req.body;

  try {
    // Check if any user is already enrolled in the selected course
    const existingEnrollments = await UserCourses.findAll({
      where: {
        UserID: { [Op.in]: userIds },
        CourseID: courseId,
        "$CommonAttributes.IsDeleted$": false,
      },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
        },
      ],
    });

    if (existingEnrollments && existingEnrollments.length > 0) {
      return res.status(400).json({
        error: "One or more users are already enrolled in the selected course",
      });
    }

    // Get the CommonAttributeID for new enrollments
    const commonAttributes = await CommonAttributes.findOne({
      where: { IsDeleted: false },
    });

    if (!commonAttributes) {
      return res
        .status(500)
        .json({ error: "No available CommonAttributeID for new enrollments" });
    }

    // Enroll the users in the selected course
    const enrollValues = userIds.map((userId) => ({
      UserID: userId,
      CourseID: courseId,
      CommonAttributeID: commonAttributes.AttributeID,
    }));
    await UserCourses.bulkCreate(enrollValues);

    console.log("Users enrolled in the selected course successfully");
    res.json({ message: "Users enrolled in the selected course successfully" });
  } catch (error) {
    console.error("Error enrolling users in course:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
