import { sequelize } from "../../../db.js";

export const handleNotificationCreate = async (req, res) => {
  const { userId, notificationContent, actionType, actionLink } = req.body;
  const Notifications = sequelize.models.Notifications;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!userId || !notificationContent || !actionType) {
      console.log("UserId, notificationContent, and actionType are required");
      return res.status(400).json({
        error: "UserId, notificationContent, and actionType are required",
      });
    }

    // Create CommonAttribute entry using UserId
    const commonAttributeResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    // Check if the CommonAttribute creation was successful
    if (commonAttributeResult) {
      const commonAttributeId = commonAttributeResult.AttributeID;

      // Insert the attribute id of CommonAttribute table as CommonAttributeID in Notifications table
      const notificationResult = await Notifications.create({
        UserID: userId,
        NotificationContent: notificationContent,
        ActionType: actionType,
        ActionLink: actionLink,
        CommonAttributeID: commonAttributeId,
      });

      if (notificationResult) {
        console.log("Notification created successfully");
        res.json({ message: "Notification created successfully" });
      } else {
        console.error("Notification creation failed");
        res.status(500).json({ error: "Notification creation failed" });
      }
    } else {
      console.error("CommonAttribute creation failed");
      res.status(500).json({ error: "CommonAttribute creation failed" });
    }
  } catch (error) {
    console.error("Error creating notification:", error);
    res
      .status(500)
      .json({ error: "Notification creation failed", details: error.message });
  }
};
