import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const softDeleteRecurringEvent = async (req, res) => {
  try {
    const { eventId, recurringEventId } = req.params;
    const UserID = req.user.userId;

    const CommonAttributes = sequelize.models.CommonAttributes;
    const RecurringEvents = sequelize.models.RecurringEvents;

    // Check if the recurring event is already deleted
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

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the recurring event is already marked as deleted, return success (no need to delete again)
      return res.json({
        success: true,
        message: "Recurring event already deleted",
      });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({
      success: true,
      message: "Recurring event soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting recurring event:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting recurring event" });
  }
};
