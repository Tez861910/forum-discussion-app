import { sequelize } from "../../../db.js";

export const softDeleteEventCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategories = sequelize.models.EventCategories;

    // Check if the event category is already deleted
    const isCategoryDeleted = await CommonAttributes.findOne({
      where: {
        AttributeID: EventCategories.findOne({
          where: { CategoryID: categoryId },
        }).CommonAttributeID,
      },
    });

    if (isCategoryDeleted.IsDeleted) {
      // If the event category is already marked as deleted, return success (no need to delete again)
      return res.json({
        success: true,
        message: "Event category already deleted",
      });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, UpdatedByUserID: UserID },
      {
        where: {
          AttributeID: EventCategories.findOne({
            where: { CategoryID: categoryId },
          }).CommonAttributeID,
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
