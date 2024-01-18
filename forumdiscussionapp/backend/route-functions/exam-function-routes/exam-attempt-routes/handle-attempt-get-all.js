import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleAttemptGetAll = async (req, res) => {
  try {
    const ExamAttempts = sequelize.models.ExamAttempts;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const result = await ExamAttempts.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
          on: {
            col: Sequelize.literal("ExamAttempts.CommonAttributeID"),
            raw: true,
          },
        },
      ],
    });

    console.log("Exam attempts retrieved successfully");
    res.json({ examAttempts: result });
  } catch (error) {
    console.error("Error getting exam attempts:", error);
    res
      .status(500)
      .json({ error: "Error getting exam attempts", details: error.message });
  }
};
