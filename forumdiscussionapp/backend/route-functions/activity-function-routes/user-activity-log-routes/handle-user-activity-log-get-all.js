import { query } from "../../../db.js";

export const handleUserActivityLogGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM UserActivityLog";
    const [result] = await query(sql);

    console.log("User activity logs retrieved successfully");
    res.json({ userActivityLogs: result });
  } catch (error) {
    console.error("Error getting user activity logs:", error);
    res
      .status(500)
      .json({
        error: "Error getting user activity logs",
        details: error.message,
      });
  }
};
