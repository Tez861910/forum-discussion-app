import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const editRecurringEvent = async (req, res) => {
  try {
    const { eventId, recurringEventId } = req.params;
    const { UpdatedRecurrenceType, UpdatedRecurrenceInterval } = req.body;
    const UserID = req.user.userId;

    const CommonAttributes = sequelize.models.CommonAttributes;
    const RecurringEvents = sequelize.models.RecurringEvents;

    // Update the RecurrenceType and RecurrenceInterval in the RecurringEvents table
    await RecurringEvents.update(
      {
        RecurrenceType: UpdatedRecurrenceType,
        RecurrenceInterval: UpdatedRecurrenceInterval,
      },
      { where: { EventID: eventId, RecurringEventID: recurringEventId } }
    );

    // Update the CommonAttributes table with the updated information
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: {
        AttributeID: Sequelize.col("RecurringEvents.CommonAttributeID"),
      },
      include: [
        {
          model: RecurringEvents,
          where: { EventID: eventId, RecurringEventID: recurringEventId },
          attributes: [],
        },
      ],
    });

    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({
      success: true,
      message: "Recurring event updated successfully",
    });
  } catch (error) {
    console.error("Error updating recurring event:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating recurring event" });
  }
};
