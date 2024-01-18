import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const getReminders = async (req, res) => {
  try {
    const { eventId } = req.params;

    const Reminders = sequelize.models.Reminders;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Selecting relevant fields from both Reminders and CommonAttributes tables
    const reminders = await Reminders.findAll({
      attributes: {
        include: [
          [Sequelize.col("CommonAttributes.CreatedAt"), "CreatedAt"],
          [
            Sequelize.col("CommonAttributes.CreatedByUserID"),
            "CreatedByUserID",
          ],
          [Sequelize.col("CommonAttributes.IsDeleted"), "IsDeleted"],
        ],
      },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
        },
      ],
      where: Sequelize.where(
        Sequelize.col("CommonAttributes.IsDeleted"),
        false
      ),
    });

    res.json({ success: true, reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ success: false, error: "Error fetching reminders" });
  }
};
