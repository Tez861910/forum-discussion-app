import { query } from "../../../db.js";

export const handleNotificationDelete = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const sql = "DELETE FROM Notifications WHERE NotificationID = ?";
    const [result] = await query(sql, [notificationId]);

    if (result.affectedRows === 1) {
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
