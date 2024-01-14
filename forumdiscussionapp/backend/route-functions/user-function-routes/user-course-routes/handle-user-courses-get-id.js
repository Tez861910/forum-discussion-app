import { UserCourses, CommonAttributes } from "../../../db.js";

export const handleUserCoursesGetId = async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch user courses for the given user ID
    const userCourses = await UserCourses.findAll({
      where: { UserID: userId, "$CommonAttributes.IsDeleted$": false },
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
