import { sequelize } from "../../../db.js";

export const handleQuestionGetAll = async (req, res) => {
  try {
    const Questions = sequelize.models.Questions;
    const result = await Questions.findAll();

    console.log("Questions retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting questions:", error);
    res
      .status(500)
      .json({ error: "Error getting questions", details: error.message });
  }
};
