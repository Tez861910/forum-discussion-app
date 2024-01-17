import { sequelize } from "../../../db.js";

export const handleUserSettingsCreate = async (req, res) => {
  const { userId, theme, darkMode, language, emailNotifications } = req.body;
  const UserSettings = sequelize.models.UserSettings;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!userId) {
      console.log("UserId is required");
      return res.status(400).json({ error: "UserId is required" });
    }

    // Create a CommonAttributes entry
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    if (!commonAttributesResult) {
      console.error("CommonAttributes creation failed");
      return res
        .status(500)
        .json({ error: "CommonAttributes creation failed" });
    }

    const commonAttributeId = commonAttributesResult.AttributeID;

    // Create UserSettings with CommonAttributeID
    const userSettingsResult = await UserSettings.create({
      UserID: userId,
      Theme: theme,
      DarkMode: darkMode,
      Language: language,
      EmailNotifications: emailNotifications,
      CommonAttributeID: commonAttributeId,
    });

    if (userSettingsResult) {
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
