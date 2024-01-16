import { sequelize } from "../../../db.js";

export const createReminder = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { ReminderTime } = req.body;

    const Reminders = sequelize.models.Reminders;
    await Reminders.create({
      EventID: eventId,
      ReminderTime,
    });

    res
      .status(201)
      .json({ success: true, message: "Reminder created successfully" });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
