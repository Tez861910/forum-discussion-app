import { UserCourses, CommonAttributes } from "../../../db.js";
import { Op } from "sequelize";

export const handleUserCoursesGet = async (req, res) => {
  const { userIds } = req.body;

  try {
    // Fetch user courses for the given user IDs
    const userCourses = await UserCourses.findAll({
      where: {
        UserID: { [Op.in]: userIds },
        "$CommonAttributes.IsDeleted$": false,
      },
      include: [
        {
          model: CommonAttributes,
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
