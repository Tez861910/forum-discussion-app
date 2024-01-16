import { sequelize } from "../../../db.js";

export const handleNotificationDelete = async (req, res) => {
  const { notificationId } = req.params;
  const Notifications = sequelize.models.Notifications;

  try {
    const result = await Notifications.destroy({
      where: { NotificationID: notificationId },
    });

    if (result === 1) {
      console.log("Notification deleted successfully");
      res.json({ message: "Notification deleted successfully" });
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
