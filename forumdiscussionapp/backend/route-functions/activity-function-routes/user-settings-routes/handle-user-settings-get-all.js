import { query } from "../../../db.js";

export const handleUserSettingsGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM UserSettings";
    const [result] = await query(sql);

    console.log("User settings retrieved successfully");
    res.json({ userSettings: result });
  } catch (error) {
    console.error("Error getting user settings:", error);
    res
      .status(500)
      .json({ error: "Error getting user settings", details: error.message });
  }
};
