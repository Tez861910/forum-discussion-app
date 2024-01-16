import { sequelize } from "../../../db.js";

export const createRecurringEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { RecurrenceType, RecurrenceInterval } = req.body;

    const RecurringEvents = sequelize.models.RecurringEvents;
    await RecurringEvents.create({
      EventID: eventId,
      RecurrenceType,
      RecurrenceInterval,
    });

    res
      .status(201)
      .json({ success: true, message: "Recurring event created successfully" });
  } catch (error) {
    console.error("Error creating recurring event:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
