import { QuestionTypes } from "../../../db.js";

export const handleQuestionTypeGetAll = async (req, res) => {
  try {
    const result = await QuestionTypes.findAll();

    console.log("Question types retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting question types:", error);
    res
      .status(500)
      .json({ error: "Error getting question types", details: error.message });
  }
};
