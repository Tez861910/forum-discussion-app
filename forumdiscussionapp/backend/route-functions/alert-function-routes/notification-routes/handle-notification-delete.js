import { sequelize } from "../../../db.js";

export const handleNotificationDelete = async (req, res) => {
  const { notificationId, deletedByUserId } = req.params;
  const Notifications = sequelize.models.Notifications;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Find the Notification by ID
    const notification = await Notifications.findOne({
      where: { NotificationID: notificationId },
    });

    // Check if the notification exists
    if (!notification) {
      console.error("Notification not found");
      return res.status(404).json({ error: "Notification not found" });
    }

    // Retrieve CommonAttributeID from the Notification
    const commonAttributeId = notification.CommonAttributeID;

    // Update IsDeleted status and DeletedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: deletedByUserId },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Notification marked as deleted successfully");
      res.json({ message: "Notification marked as deleted successfully" });
    } else {
      console.error("Notification deletion failed");
      res.status(500).json({ error: "Notification deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    res
      .status(500)
      .json({ error: "Notification deletion failed", details: error.message });
  }
};
