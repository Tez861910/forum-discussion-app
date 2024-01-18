import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleCategoryGetAll = async (req, res) => {
  try {
    const ExamCategorys = sequelize.models.ExamCategorys;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const result = await ExamCategorys.findAll({
      include: [
        {
          model: CommonAttributes,
          where: {
            AttributeID: Sequelize.col("ExamCategorys.CommonAttributeID"),
            IsDeleted: false,
          },
          attributes: [],
        },
      ],
    });

    console.log("Exam categories retrieved successfully");
    res.json({ examCategories: result });
  } catch (error) {
    console.error("Error getting exam categories:", error);
    res
      .status(500)
      .json({ error: "Error getting exam categories", details: error.message });
  }
};
