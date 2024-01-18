import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleCategoryCreate = async (req, res) => {
  const { categoryName, createdByUserId } = req.body;

  const ExamCategorys = sequelize.models.ExamCategorys;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Create a transaction to ensure atomicity
    const result = await sequelize.transaction(async (t) => {
      // Create a CommonAttributes entry with CreatedByUserID
      const commonAttributesResult = await CommonAttributes.create(
        {
          CreatedByUserID: createdByUserId,
        },
        { transaction: t }
      );

      // Use the CommonAttributeID in creating the ExamCategorys entry
      const examCategoryResult = await ExamCategorys.create(
        {
          CategoryName: categoryName,
          CommonAttributeID: commonAttributesResult.AttributeID,
        },
        { transaction: t }
      );

      return examCategoryResult;
    });

    console.log("Exam category created successfully");
    res.json({ message: "Exam category created successfully" });
  } catch (error) {
    console.error("Error creating exam category:", error);
    res
      .status(500)
      .json({ error: "Exam category creation failed", details: error.message });
  }
};
