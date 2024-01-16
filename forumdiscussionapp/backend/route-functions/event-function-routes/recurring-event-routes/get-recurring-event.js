import { sequelize } from "../../../db.js";

export const getRecurringEvents = async (req, res) => {
  try {
    const { eventId } = req.params;

    const RecurringEvents = sequelize.models.RecurringEvents;
    const recurringEvents = await RecurringEvents.findAll({
      where: { EventID: eventId },
    });

    res.json({ success: true, recurringEvents });
  } catch (error) {
    console.error("Error fetching recurring events:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching recurring events" });
  }
};
