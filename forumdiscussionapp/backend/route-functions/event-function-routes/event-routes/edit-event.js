import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const editEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { EventTitle, EventDescription, EventDate } = req.body;
    const CourseID = req.user.courseId;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Events = sequelize.models.Events;

    // Check if the event is marked as deleted in CommonAttributes
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
      // If the event is marked as deleted, return an error
      return res
        .status(400)
        .json({ success: false, error: "Cannot edit a deleted event" });
    }

    // Update the event details in the Events table
    await Events.update(
      { EventTitle, EventDescription, EventDate, CourseID },
      { where: { EventID: eventId } }
    );

    // Update the CommonAttributes table with the updated information
    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    res.json({ success: true, message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, error: "Error updating event" });
  }
};
