import { sequelize } from "../../../db.js";

export const handleUserActivityLogCreate = async (req, res) => {
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

    // Create a CommonAttribute entry
    const commonAttributeResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    if (!commonAttributeResult) {
      console.error("CommonAttribute creation failed");
      return res.status(500).json({ error: "CommonAttribute creation failed" });
    }

    // Get the AttributeID from the created CommonAttribute entry
    const commonAttributeId = commonAttributeResult.AttributeID;

    // Create a UserActivityLog entry with CommonAttributeID
    const result = await UserActivityLogs.create({
      UserID: userId,
      ActivityType: activityType,
      ActivityDetails: activityDetails,
      IPAddress: ipAddress,
      CommonAttributeID: commonAttributeId,
    });

    if (result) {
      console.log("User activity log created successfully");
      res.json({ message: "User activity log created successfully" });
    } else {
      console.error("User activity log creation failed");
      res.status(500).json({ error: "User activity log creation failed" });
    }
  } catch (error) {
    console.error("Error creating user activity log:", error);
    res.status(500).json({
      error: "User activity log creation failed",
      details: error.message,
    });
  }
};
