import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Events = sequelize.models.Events;

    // Check if the event is already deleted
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: { AttributeID: Sequelize.col("Events.CommonAttributeID") },
      include: [
        {
          model: Events,
          where: { EventID: eventId },
          attributes: [],
        },
      ],
    });

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the event is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: "Event already deleted" });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({ success: true, message: "Event soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting event:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting event" });
  }
};
