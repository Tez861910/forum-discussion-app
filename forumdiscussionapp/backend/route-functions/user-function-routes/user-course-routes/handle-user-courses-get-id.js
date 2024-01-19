import { sequelize } from "../../../db.js";

export const handleUserCoursesGetId = async (req, res) => {
  const { userId } = req.query;

  try {
    // Dynamically access the models using sequelize.models
    const UserCourses = sequelize.models.UserCourses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch user courses for the given user ID
    const userCourses = await UserCourses.findAll({
      where: { UserID: userId },
      include: [
        {
          model: CommonAttributes,
          IsDeleted: false,
          attributes: [],
        },
      ],
    });

    console.log("User courses fetched successfully");
    res.json({ userCourses });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res
      .status(500)
      .json({ error: "User courses retrieval failed", details: error.message });
  }
};
