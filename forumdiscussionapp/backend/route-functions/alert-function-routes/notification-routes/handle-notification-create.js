import { sequelize } from "../../../db.js";

export const handleNotificationCreate = async (req, res) => {
  const { userId, notificationContent, actionType, actionLink } = req.body;
  const Notifications = sequelize.models.Notifications;

  try {
    if (!userId || !notificationContent || !actionType) {
      console.log("UserId, notificationContent, and actionType are required");
      return res.status(400).json({
        error: "UserId, notificationContent, and actionType are required",
      });
    }

    const result = await Notifications.create({
      UserID: userId,
      NotificationContent: notificationContent,
      ActionType: actionType,
      ActionLink: actionLink,
    });

    if (result) {
      console.log("Notification created successfully");
      res.json({ message: "Notification created successfully" });
    } else {
      console.error("Notification creation failed");
      res.status(500).json({ error: "Notification creation failed" });
    }
  } catch (error) {
    console.error("Error creating notification:", error);
    res
      .status(500)
      .json({ error: "Notification creation failed", details: error.message });
  }
};
