import { UserCourses, CommonAttributes } from "../../../db.js";
import { Op } from "sequelize";

export const handleCoursesEnroll = async (req, res) => {
  const { userId, courseIds } = req.body;

  try {
    // Check if any user is already enrolled in any of the selected courses
    const existingEnrollments = await UserCourses.findAll({
      where: {
        UserID: userId,
        CourseID: { [Op.in]: courseIds },
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
        error: "The user is already enrolled in one or more selected courses",
      });
    }

    // Get the UserCoursesAttributeID for the new enrollments
    const commonAttributes = await CommonAttributes.findOne({
      where: { IsDeleted: false },
    });

    if (!commonAttributes) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve UserCoursesAttributeID" });
    }

    // Enroll the user in all selected courses using the new UserCoursesAttributeID
    const enrollValues = courseIds.map((courseId) => ({
      UserID: userId,
      CourseID: courseId,
      CommonAttributeID: commonAttributes.AttributeID,
    }));
    await UserCourses.bulkCreate(enrollValues);

    console.log("User enrolled in the selected courses successfully");
    res.json({ message: "User enrolled in the selected courses successfully" });
  } catch (error) {
    console.error("Error enrolling user in courses:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
