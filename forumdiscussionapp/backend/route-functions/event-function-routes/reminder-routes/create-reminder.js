import { sequelize } from "../../../db.js";

export const createReminder = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { ReminderTime } = req.body;

    const Reminders = sequelize.models.Reminders;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: req.user.userId,
    });

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.get("AttributeID");

    // Insert into Reminders table using CommonAttributeID
    await Reminders.create({
      EventID: eventId,
      ReminderTime,
      CommonAttributeID: commonAttributeID,
    });

    res
      .status(201)
      .json({ success: true, message: "Reminder created successfully" });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
