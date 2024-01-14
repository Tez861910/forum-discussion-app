import { UserCourses, CommonAttributes } from "../../../db.js";
import { Op } from "sequelize";

export const handleRemoveUsersFromCourse = async (req, res) => {
  const { courseId, userIds } = req.body;
  const { deletedByUserID } = req.body;

  try {
    // Fetch the user course for the given user IDs and course ID
    const userCourses = await UserCourses.findAll({
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

    if (!userCourses || userCourses.length === 0) {
      return res
        .status(404)
        .json({ error: "Enrollment not found or already removed" });
    }

    // Soft-delete the enrollments
    await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedAt: new Date(),
        DeletedByUserID: deletedByUserID,
      },
      {
        where: {
          AttributeID: {
            [Op.in]: userCourses.map(
              (userCourse) => userCourse.CommonAttributeID
            ),
          },
        },
      }
    );

    console.log(`Users removed from the course ${courseId}.`);
    res.json({ message: "Users removed from the course successfully" });
  } catch (error) {
    console.error("Error removing users from course:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
