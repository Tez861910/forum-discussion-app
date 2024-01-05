import { query } from "../../../db.js";

export const handleUserActivityLogUpdate = async (req, res) => {
  const { logId } = req.params;
  const { userId, activityType, activityDetails, ipAddress } = req.body;

  try {
    if (!userId || !activityType) {
      console.log("UserId and ActivityType are required");
      return res
        .status(400)
        .json({ error: "UserId and ActivityType are required" });
    }

    const sql =
      "UPDATE UserActivityLog SET UserID = ?, ActivityType = ?, ActivityDetails = ?, IPAddress = ? WHERE LogID = ?";
    const [result] = await query(sql, [
      userId,
      activityType,
      activityDetails,
      ipAddress,
      logId,
    ]);

    if (result.affectedRows === 1) {
      console.log("User activity log updated successfully");
      res.json({ message: "User activity log updated successfully" });
    } else {
      console.error("User activity log update failed");
      res.status(500).json({ error: "User activity log update failed" });
    }
  } catch (error) {
    console.error("Error updating user activity log:", error);
    res
      .status(500)
      .json({
        error: "User activity log update failed",
        details: error.message,
      });
  }
};
