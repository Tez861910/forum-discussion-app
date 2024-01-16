import { sequelize } from "../../../db.js";

export const handleUserActivityLogDelete = async (req, res) => {
  const { logId } = req.params;
  const UserActivityLogs = sequelize.models.UserActivityLogs;

  try {
    const result = await UserActivityLogs.destroy({
      where: {
        LogID: logId,
      },
    });

    if (result === 1) {
      console.log("User activity log deleted successfully");
      res.json({ message: "User activity log deleted successfully" });
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
