import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleCategoryUpdate = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;
  const UserID = req.user.userId;

  const ExamCategorys = sequelize.models.ExamCategorys;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Update the ExamCategorys table
    const result = await ExamCategorys.update(
      {
        CategoryName: categoryName,
      },
      {
        where: {
          CategoryID: categoryId,
        },
      }
    );

    if (result[0] !== 1) {
      console.error("Exam category update failed");
      return res.status(500).json({ error: "Exam category update failed" });
    }

    // Update the CommonAttributes table with the updated information
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: { AttributeID: Sequelize.col("ExamCategorys.CommonAttributeID") },
      include: [
        {
          model: ExamCategorys,
          where: { CategoryID: categoryId },
          attributes: [],
        },
      ],
    });

    await CommonAttributes.update(
      { UpdatedByUserID: UserID },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    console.log("Exam category updated successfully");
    res.json({ message: "Exam category updated successfully" });
  } catch (error) {
    console.error("Error updating exam category:", error);
    res
      .status(500)
      .json({ error: "Exam category update failed", details: error.message });
  }
};
