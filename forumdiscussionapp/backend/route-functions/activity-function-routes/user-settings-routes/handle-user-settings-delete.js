import { sequelize } from "../../../db.js";

export const handleUserSettingsDelete = async (req, res) => {
  const { settingId } = req.params;
  const { deletedByUserId } = req.body;
  const UserSettings = sequelize.models.UserSettings;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Find the UserSettings by ID
    const userSettings = await UserSettings.findOne({
      where: {
        SettingID: settingId,
      },
    });

    // Check if the user settings exist
    if (!userSettings) {
      console.error("User settings not found");
      return res.status(404).json({ error: "User settings not found" });
    }

    // Retrieve CommonAttributeID from the UserSettings
    const commonAttributeId = userSettings.CommonAttributeID;

    // Update IsDeleted status and DeletedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: deletedByUserId },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("User settings marked as deleted successfully");
      res.json({ message: "User settings marked as deleted successfully" });
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
