import { query } from "../../../db.js";

export const handleForumModeratorGetUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = "SELECT * FROM ForumsModerators WHERE UserID = ?";
    const [result] = await query(sql, [userId]);

    console.log("Forum moderators retrieved successfully for userId:", userId);
    res.json(result);
  } catch (error) {
    console.error("Error getting forum moderators for userId:", userId, error);
    res
      .status(500)
      .json({
        error: "Error getting forum moderators",
        details: error.message,
      });
  }
};
