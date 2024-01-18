import { sequelize } from "../../../db.js";

export const softDeleteEventCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategories = sequelize.models.EventCategories;

    // Find the Event Category by ID
    const eventCategory = await EventCategories.findOne({
      where: { CategoryID: categoryId },
    });

    // Check if the event category exists
    if (!eventCategory) {
      console.error("Event category not found");
      return res
        .status(404)
        .json({ success: false, error: "Event category not found" });
    }

    // Retrieve CommonAttributeID from the Event Category
    const commonAttributeId = eventCategory.CommonAttributeID;

    // Update IsDeleted status in CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: UserID },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    res.json({
      success: true,
      message: "Event category soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting event category:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting event category" });
  }
};
