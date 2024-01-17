import { sequelize } from "../../../db.js";

export const handleNotificationUpdate = async (req, res) => {
  const { notificationId } = req.params;
  const { userId, notificationContent, actionType, actionLink, isRead } =
    req.body;
  const Notifications = sequelize.models.Notifications;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!userId || !notificationContent || !actionType) {
      console.log("UserId, notificationContent, and actionType are required");
      return res.status(400).json({
        error: "UserId, notificationContent, and actionType are required",
      });
    }

    // Find the Notification by ID
    const notification = await Notifications.findOne({
      where: { NotificationID: notificationId },
    });

    // Check if the notification exists
    if (!notification) {
      console.error("Notification not found");
      return res.status(404).json({ error: "Notification not found" });
    }

    // Update the Notification
    const result = await Notifications.update(
      {
        UserID: userId,
        NotificationContent: notificationContent,
        ActionType: actionType,
        ActionLink: actionLink,
        IsRead: isRead,
      },
      { where: { NotificationID: notificationId } }
    );

    // Update UpdatedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      { UpdatedByUserID: userId },
      {
        where: {
          AttributeID: notification.CommonAttributeID,
        },
      }
    );

    if (result[0] === 1 && commonAttributeUpdateResult[0] === 1) {
      console.log("Notification updated successfully");
      res.json({ message: "Notification updated successfully" });
    } else {
      console.error("Notification update failed");
      res.status(500).json({ error: "Notification update failed" });
    }
  } catch (error) {
    console.error("Error updating notification:", error);
    res
      .status(500)
      .json({ error: "Notification update failed", details: error.message });
  }
};
