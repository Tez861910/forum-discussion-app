import { sequelize } from "../../../db.js";

export const getReminders = async (req, res) => {
  try {
    const { eventId } = req.params;

    const Reminders = sequelize.models.Reminders;
    const reminders = await Reminders.findAll({
      where: { EventID: eventId },
    });

    res.json({ success: true, reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ success: false, error: "Error fetching reminders" });
  }
};
