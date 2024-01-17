import { sequelize } from "../../../db.js";

export const handleUserActivityLogUpdate = async (req, res) => {
  const { logId } = req.params;
  const { userId, activityType, activityDetails, ipAddress } = req.body;
  const UserActivityLogs = sequelize.models.UserActivityLogs;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!userId || !activityType) {
      console.log("UserId and ActivityType are required");
      return res
        .status(400)
        .json({ error: "UserId and ActivityType are required" });
    }

    // Find the UserActivityLog by ID
    const userActivityLog = await UserActivityLogs.findOne({
      where: {
        LogID: logId,
      },
    });

    // Check if the user activity log exists
    if (!userActivityLog) {
      console.error("User activity log not found");
      return res.status(404).json({ error: "User activity log not found" });
    }

    // Retrieve CommonAttributeID from the UserActivityLog
    const commonAttributeId = userActivityLog.CommonAttributeID;

    // Update UserActivityLogs data
    const result = await UserActivityLogs.update(
      {
        UserID: userId,
        ActivityType: activityType,
        ActivityDetails: activityDetails,
        IPAddress: ipAddress,
      },
      {
        where: {
          LogID: logId,
        },
      }
    );

    // Check if the update was successful
    if (result[0] === 1) {
      // Update UpdatedByUserID in CommonAttributes table
      await CommonAttributes.update(
        { UpdatedByUserID: userId },
        {
          where: {
            AttributeID: commonAttributeId,
          },
        }
      );

      console.log("User activity log updated successfully");
      res.json({ message: "User activity log updated successfully" });
    } else {
      console.error("User activity log update failed");
      res.status(500).json({ error: "User activity log update failed" });
    }
  } catch (error) {
    console.error("Error updating user activity log:", error);
    res.status(500).json({
      error: "User activity log update failed",
      details: error.message,
    });
  }
};
