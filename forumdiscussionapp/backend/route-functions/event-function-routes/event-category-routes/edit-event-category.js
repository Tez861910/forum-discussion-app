import { sequelize } from "../../../db.js";

export const editEventCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { CategoryName } = req.body;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategories = sequelize.models.EventCategories;

    // Update the CategoryName in the EventCategories table
    await EventCategories.update(
      { CategoryName: CategoryName },
      { where: { CategoryID: categoryId } }
    );

    // Update the CommonAttributes table with the updated information
    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      {
        where: {
          AttributeID: EventCategories.findOne({
            where: { CategoryID: categoryId },
          }).CommonAttributeID,
        },
      }
    );

    res.json({ success: true, message: "Event category updated successfully" });
  } catch (error) {
    console.error("Error updating event category:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating event category" });
  }
};
