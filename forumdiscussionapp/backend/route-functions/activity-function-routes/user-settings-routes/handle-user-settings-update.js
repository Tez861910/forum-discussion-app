import { sequelize } from "../../../db.js";

export const handleUserSettingsUpdate = async (req, res) => {
  const { settingId } = req.params;
  const { theme, darkMode, language, emailNotifications } = req.body;
  const UserSettings = sequelize.models.UserSettings;

  try {
    const result = await UserSettings.update(
      {
        Theme: theme,
        DarkMode: darkMode,
        Language: language,
        EmailNotifications: emailNotifications,
      },
      {
        where: {
          SettingID: settingId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("User settings updated successfully");
      res.json({ message: "User settings updated successfully" });
    } else {
      console.error("User settings update failed");
      res.status(500).json({ error: "User settings update failed" });
    }
  } catch (error) {
    console.error("Error updating user settings:", error);
    res
      .status(500)
      .json({ error: "User settings update failed", details: error.message });
  }
};
