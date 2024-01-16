import { sequelize } from "../../../db.js";

export const handleNotificationGetAll = async (req, res) => {
  const Notifications = sequelize.models.Notifications;

  try {
    const result = await Notifications.findAll();

    console.log("Notifications retrieved successfully");
    res.json({ notifications: result });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res
      .status(500)
      .json({ error: "Error getting notifications", details: error.message });
  }
};
