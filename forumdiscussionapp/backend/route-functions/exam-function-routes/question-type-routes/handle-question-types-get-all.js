import { sequelize } from "../../../db.js";

export const handleQuestionTypeGetAll = async (req, res) => {
  try {
    const QuestionTypes = sequelize.models.QuestionTypes;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Retrieve all question types with associated CommonAttributes
    const result = await QuestionTypes.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
      attributes: { exclude: ["CommonAttributeID"] },
    });

    console.log("Question types retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting question types:", error);
    res
      .status(500)
      .json({ error: "Error getting question types", details: error.message });
  }
};
