import { sequelize } from "../../../db.js";

export const createEventCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const UserID = req.user.userId;
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategories = sequelize.models.EventCategories;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: UserID,
    });

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.id;

    // Insert into EventCategories table using CommonAttributeID
    const result = await EventCategories.create({
      CategoryName: CategoryName,
      CommonAttributeID: commonAttributeID,
    });

    res.status(201).json({
      success: true,
      message: "Event category created successfully",
      categoryId: result.id,
    });
  } catch (error) {
    console.error("Error creating event category:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
