import { sequelize } from "../../../db.js";

export const handleCategoryGetAll = async (req, res) => {
  try {
    const ExamCategorys = sequelize.models.ExamCategorys;
    const result = await ExamCategorys.findAll();

    console.log("Exam categories retrieved successfully");
    res.json({ examCategories: result });
  } catch (error) {
    console.error("Error getting exam categories:", error);
    res
      .status(500)
      .json({ error: "Error getting exam categories", details: error.message });
  }
};
