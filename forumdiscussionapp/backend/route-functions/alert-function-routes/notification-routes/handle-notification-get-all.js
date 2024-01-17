import { sequelize } from "../../../db.js";

export const handleNotificationGetAll = async (req, res) => {
  const Notifications = sequelize.models.Notifications;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Find all Notifications where IsDeleted is false
    const result = await Notifications.findAll({
      include: [
        {
          model: CommonAttributes,
          where: {
            AttributeID: sequelize.col("Notifications.CommonAttributeID"),
            IsDeleted: false,
          },
          required: true,
        },
      ],
    });

    console.log("Notifications retrieved successfully");
    res.json({ notifications: result });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res
      .status(500)
      .json({ error: "Error getting notifications", details: error.message });
  }
};
