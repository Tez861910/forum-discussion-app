import { sequelize } from "../../../db.js";

export const handleAnswersGetAll = async (req, res) => {
  try {
    const Answers = sequelize.models.Answers;
    const result = await Answers.findAll();

    console.log("Answers retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting answers:", error);
    res
      .status(500)
      .json({ error: "Error getting answers", details: error.message });
  }
};
