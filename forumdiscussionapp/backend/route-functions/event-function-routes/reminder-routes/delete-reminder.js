import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const softDeleteReminder = async (req, res) => {
  try {
    const { eventId, reminderId } = req.params;
    const UserID = req.user.userId;

    const CommonAttributes = sequelize.models.CommonAttributes;
    const Reminders = sequelize.models.Reminders;

    // Check if the reminder is already deleted
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

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the reminder is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: "Reminder already deleted" });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({ success: true, message: "Reminder soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting reminder:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting reminder" });
  }
};
