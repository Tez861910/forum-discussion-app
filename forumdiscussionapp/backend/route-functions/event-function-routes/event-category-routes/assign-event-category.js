import { sequelize } from "../../../db.js";

export const assignEventCategory = async (req, res) => {
  try {
    const { eventId, categoryId } = req.params;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategoryMappings = sequelize.models.EventCategoryMappings;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: UserID,
    });

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.id;

    // Insert into EventCategoryMapping table using CommonAttributeID
    await EventCategoryMappings.create({
      EventID: eventId,
      CategoryID: categoryId,
      CommonAttributeID: commonAttributeID,
    });

    res.json({
      success: true,
      message: "Event category assigned successfully",
    });
  } catch (error) {
    console.error("Error assigning event category:", error);
    res
      .status(500)
      .json({ success: false, error: "Error assigning event category" });
  }
};
