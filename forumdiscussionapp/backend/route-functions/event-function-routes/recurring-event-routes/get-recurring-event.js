import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const getRecurringEvents = async (req, res) => {
  try {
    const { eventId } = req.params;

    const RecurringEvents = sequelize.models.RecurringEvents;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Selecting relevant fields from both RecurringEvents and CommonAttributes tables
    const recurringEvents = await RecurringEvents.findAll({
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
      where: {
        EventID: eventId,
        [Sequelize.col("CommonAttributes.IsDeleted")]: false,
      },
    });

    res.json({ success: true, recurringEvents });
  } catch (error) {
    console.error("Error fetching recurring events:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching recurring events" });
  }
};
