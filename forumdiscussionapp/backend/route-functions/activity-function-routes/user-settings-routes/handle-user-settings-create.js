import { query } from "../../../db.js";

export const handleUserSettingsCreate = async (req, res) => {
  const { userId, theme, darkMode, language, emailNotifications } = req.body;

  try {
    if (!userId) {
      console.log("UserId is required");
      return res.status(400).json({ error: "UserId is required" });
    }

    const sql =
      "INSERT INTO UserSettings (UserID, Theme, DarkMode, Language, EmailNotifications) VALUES (?, ?, ?, ?, ?)";
    const [result] = await query(sql, [
      userId,
      theme,
      darkMode,
      language,
      emailNotifications,
    ]);

    if (result.affectedRows === 1) {
      console.log("User settings created successfully");
      res.json({ message: "User settings created successfully" });
    } else {
      console.error("User settings creation failed");
      res.status(500).json({ error: "User settings creation failed" });
    }
  } catch (error) {
    console.error("Error creating user settings:", error);
    res
      .status(500)
      .json({ error: "User settings creation failed", details: error.message });
  }
};
