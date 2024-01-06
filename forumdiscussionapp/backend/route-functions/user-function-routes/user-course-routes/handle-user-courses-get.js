import { query } from "../../../db.js";

export const handleUserCoursesGet = async (req, res) => {
  try {
    const userIds = req.body.userIds;

    // Validate userIds
    if (!userIds || userIds.length === 0) {
      throw new Error("Invalid user IDs provided");
    }

    // Assuming CommonAttributes table has an IsDeleted column
    const userCoursesQuery = `
      SELECT uc.*
      FROM UserCourses uc
      INNER JOIN CommonAttributes ca ON uc.CommonAttributeID = ca.AttributeID
      WHERE uc.UserID IN (${userIds
        .map(() => "?")
        .join(", ")}) AND ca.IsDeleted = FALSE
    `;

    const userCourses = await query(userCoursesQuery, userIds);

    res.json({ userCourses });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res
      .status(500)
      .json({ error: "Error fetching user courses. Please try again later." });
  }
};
