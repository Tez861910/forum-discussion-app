import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleCategoryDelete = async (req, res) => {
  const { categoryId } = req.params;
  const UserID = req.user.userId; // Assuming you have access to the user ID

  const ExamCategorys = sequelize.models.ExamCategorys;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Check if the category is already deleted
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: {
        AttributeID: Sequelize.col("ExamCategorys.CommonAttributeID"),
      },
      include: [
        {
          model: ExamCategorys,
          where: { CategoryID: categoryId },
          attributes: [],
        },
      ],
    });

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the category is already marked as deleted, return success (no need to delete again)
      return res.json({
        success: true,
        message: "Exam category already deleted",
      });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    console.log("Exam category soft deleted successfully");
    res.json({
      success: true,
      message: "Exam category soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting exam category:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting exam category" });
  }
};
