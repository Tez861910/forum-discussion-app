import { sequelize } from "../../../db.js";

export const handleUserSettingsGetAll = async (req, res) => {
  const UserSettings = sequelize.models.UserSettings;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const result = await UserSettings.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("User settings retrieved successfully");
    res.json({ userSettings: result });
  } catch (error) {
    console.error("Error getting user settings:", error);
    res
      .status(500)
      .json({ error: "Error getting user settings", details: error.message });
  }
};
