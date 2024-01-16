import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const editReminder = async (req, res) => {
  try {
    const { eventId, reminderId } = req.params;
    const { UpdatedReminderTime } = req.body;
    const UserID = req.user.userId;

    const CommonAttributes = sequelize.models.CommonAttributes;
    const Reminders = sequelize.models.Reminders;

    // Update the ReminderTime in the Reminders table
    await Reminders.update(
      { ReminderTime: UpdatedReminderTime },
      { where: { EventID: eventId, ReminderID: reminderId } }
    );

    // Update the CommonAttributes table with the updated information
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: { AttributeID: Sequelize.col("Reminders.CommonAttributeID") },
      include: [
        {
          model: Reminders,
          where: { EventID: eventId, ReminderID: reminderId },
          attributes: [],
        },
      ],
    });

    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({ success: true, message: "Reminder updated successfully" });
  } catch (error) {
    console.error("Error updating reminder:", error);
    res.status(500).json({ success: false, error: "Error updating reminder" });
  }
};
