import { sequelize } from "../../../db.js";

export const handleUserActivityLogDelete = async (req, res) => {
  const { logId, DeletedByUserID } = req.params;
  const UserActivityLogs = sequelize.models.UserActivityLogs;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
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

    // Update IsDeleted status in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: DeletedByUserID,
      },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("User activity log marked as deleted successfully");
      res.json({ message: "User activity log marked as deleted successfully" });
    } else {
      console.error("User activity log deletion failed");
      res.status(500).json({ error: "User activity log deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting user activity log:", error);
    res.status(500).json({
      error: "User activity log deletion failed",
      details: error.message,
    });
  }
};
