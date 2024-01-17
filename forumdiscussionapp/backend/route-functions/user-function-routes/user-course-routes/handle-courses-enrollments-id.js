import { sequelize } from "../../../db.js";

export const handleCoursesEnrollmentsId = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const Users = sequelize.models.Users;
    const UserCourses = sequelize.models.UserCourses;
    const Courses = sequelize.models.Courses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch user data for a given course ID
    const users = await Users.findAll({
      where: {
        "$UserCourses.CourseID$": courseId,
        "$UserCourses.CommonAttributes.IsDeleted$": false,
      },
      include: [
        {
          model: UserCourses,
          where: { CourseID: courseId },
          include: [
            {
              model: Courses,
              include: [
                {
                  model: CommonAttributes,
                  where: { IsDeleted: false },
                  attributes: [],
                },
              ],
              attributes: [],
            },
            {
              model: CommonAttributes,
              where: { IsDeleted: false },
              attributes: [],
            },
          ],
          attributes: [],
        },
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
      attributes: ["UserID", "UserName"],
    });

    const enrollmentsResult = {};
    users.forEach((user) => {
      if (!enrollmentsResult[user.UserID]) {
        enrollmentsResult[user.UserID] = [];
      }
      enrollmentsResult[user.UserID].push({
        UserID: user.UserID,
        UserName: user.UserName,
      });
    });

    console.log("Usernames fetched successfully");
    res.json({ enrollments: enrollmentsResult });
  } catch (error) {
    console.error("Error fetching usernames by course ID:", error);
    res.status(500).json({
      error: "Usernames retrieval by course ID failed",
      details: error.message,
    });
  }
};
