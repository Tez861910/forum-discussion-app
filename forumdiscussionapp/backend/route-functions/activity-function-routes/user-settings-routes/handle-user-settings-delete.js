import { query } from "../../../db.js";

export const handleUserSettingsDelete = async (req, res) => {
  const { settingId } = req.params;

  try {
    const sql = "DELETE FROM UserSettings WHERE SettingID = ?";
    const [result] = await query(sql, [settingId]);

    if (result.affectedRows === 1) {
      console.log("User settings deleted successfully");
      res.json({ message: "User settings deleted successfully" });
    } else {
      console.error("User settings deletion failed");
      res.status(500).json({ error: "User settings deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting user settings:", error);
    res
      .status(500)
      .json({ error: "User settings deletion failed", details: error.message });
  }
};
