import { query } from "../../../db.js";

export const getReminders = async (req, res) => {
  try {
    const { eventId } = req.params;
    const reminders = await query("SELECT * FROM Reminders WHERE EventID = ?", [
      eventId,
    ]);
    res.json({ success: true, reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ success: false, error: "Error fetching reminders" });
  }
};
