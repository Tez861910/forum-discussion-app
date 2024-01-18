import { sequelize } from "../../../db.js";

export const handleQuestionGetAll = async (req, res) => {
  try {
    const Questions = sequelize.models.Questions;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Retrieve all questions with associated CommonAttributes
    const result = await Questions.findAll({
      include: {
        model: CommonAttributes,
        where: { IsDeleted: false },
        attributes: [],
      },
    });

    console.log("Questions retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting questions:", error);
    res
      .status(500)
      .json({ error: "Error getting questions", details: error.message });
  }
};
