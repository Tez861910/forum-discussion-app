import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleAnswersGetAll = async (req, res) => {
  try {
    const Answers = sequelize.models.Answers;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const answers = await Answers.findAll({
      where: Sequelize.where(
        Sequelize.col("CommonAttributes.IsDeleted"),
        false
      ),
      include: [
        {
          model: CommonAttributes,
          attributes: [],
        },
      ],
    });

    console.log("Answers retrieved successfully");
    res.json(answers);
  } catch (error) {
    console.error("Error getting answers:", error);
    res
      .status(500)
      .json({ error: "Error getting answers", details: error.message });
  }
};
