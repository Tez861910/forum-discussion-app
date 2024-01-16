import { sequelize } from "../../../db.js";

export const editAssignedEventCategory = async (req, res) => {
  try {
    const { eventId, categoryId } = req.params;
    const { UpdatedCategoryName } = req.body;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategoryMappings = sequelize.models.EventCategoryMappings;

    // Update the CategoryName in the EventCategoryMapping table
    await EventCategoryMappings.update(
      { UpdatedCategoryName: UpdatedCategoryName },
      { where: { EventID: eventId, CategoryID: categoryId } }
    );

    // Update the CommonAttributes table with the updated information
    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      {
        where: {
          AttributeID: EventCategoryMappings.findOne({
            where: { EventID: eventId, CategoryID: categoryId },
          }).CommonAttributeID,
        },
      }
    );

    res.json({
      success: true,
      message: "Assigned event category updated successfully",
    });
  } catch (error) {
    console.error("Error updating assigned event category:", error);
    res.status(500).json({
      success: false,
      error: "Error updating assigned event category",
    });
  }
};
