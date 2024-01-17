import { sequelize } from "../../../db.js";

export const handleUserSettingsUpdate = async (req, res) => {
  const { settingId } = req.params;
  const { theme, darkMode, language, emailNotifications } = req.body;
  const UserSettings = sequelize.models.UserSettings;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Update UserSettings
    const userSettingsUpdateResult = await UserSettings.update(
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

    // Check if the update was successful
    if (userSettingsUpdateResult[0] !== 1) {
      console.error("User settings update failed");
      return res.status(500).json({ error: "User settings update failed" });
    }

    // Retrieve CommonAttributeID from the updated UserSettings
    const userSettings = await UserSettings.findOne({
      where: {
        SettingID: settingId,
      },
    });
    const commonAttributeId = userSettings.CommonAttributeID;

    // Update UpdatedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      { UpdatedByUserID: userId },
      {
        where: {
          AttributeID: commonAttributeId,
        },
      }
    );

    // Check if the update in CommonAttributes was successful
    if (commonAttributeUpdateResult[0] !== 1) {
      console.error("CommonAttributes update failed");
      return res.status(500).json({ error: "CommonAttributes update failed" });
    }

    console.log("User settings updated successfully");
    res.json({ message: "User settings updated successfully" });
  } catch (error) {
    console.error("Error updating user settings:", error);
    res
      .status(500)
      .json({ error: "User settings update failed", details: error.message });
  }
};
