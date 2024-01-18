import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const getAllEvents = async (req, res) => {
  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Events = sequelize.models.Events;

    // Selecting relevant fields from both Events and CommonAttributes tables
    const events = await Events.findAll({
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
          where: { IsDeleted: false },
        },
      ],
    });

    res.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, error: "Error fetching events" });
  }
};
