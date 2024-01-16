import { sequelize } from "../../../db.js";

export const softDeleteAssignedEventCategory = async (req, res) => {
  try {
    const { eventId, categoryId } = req.params;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategoryMappings = sequelize.models.EventCategoryMappings;

    // Check if the assigned event category is already deleted
    const isAssignedCategoryDeleted = await CommonAttributes.findOne({
      where: {
        AttributeID: EventCategoryMappings.findOne({
          where: { EventID: eventId, CategoryID: categoryId },
        }).CommonAttributeID,
      },
    });

    if (isAssignedCategoryDeleted.IsDeleted) {
      // If the assigned event category is already marked as deleted, return success (no need to delete again)
      return res.json({
        success: true,
        message: "Assigned event category already deleted",
      });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, UpdatedByUserID: UserID },
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
      message: "Assigned event category soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting assigned event category:", error);
    res.status(500).json({
      success: false,
      error: "Error soft deleting assigned event category",
    });
  }
};
