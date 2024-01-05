import { query } from "../../../db.js";

export const editRecurringEvent = async (req, res) => {
  try {
    const { eventId, recurringEventId } = req.params;
    const { UpdatedRecurrenceType, UpdatedRecurrenceInterval } = req.body;
    const UserID = req.user.userId;

    // Update the RecurrenceType and RecurrenceInterval in the RecurringEvents table
    await query(
      "UPDATE RecurringEvents SET RecurrenceType = ?, RecurrenceInterval = ? WHERE EventID = ? AND RecurringEventID = ?",
      [
        UpdatedRecurrenceType,
        UpdatedRecurrenceInterval,
        eventId,
        recurringEventId,
      ]
    );

    // Update the CommonAttributes table with the updated information
    await query(
      "UPDATE CommonAttributes SET UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM RecurringEvents WHERE EventID = ? AND RecurringEventID = ?)",
      [UserID, eventId, recurringEventId]
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
