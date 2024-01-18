import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleScheduleGetAll = async (req, res) => {
  try {
    const ExamSchedules = sequelize.models.ExamSchedules;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find all exam schedules with the condition to check IsDeleted in CommonAttributes
    const result = await ExamSchedules.findAll({
      include: [
        {
          model: CommonAttributes,
          where: {
            AttributeID: Sequelize.col("ExamSchedules.CommonAttributeID"),
            IsDeleted: false,
          },
          attributes: [],
        },
      ],
    });

    console.log("Exam schedules retrieved successfully");
    res.json({ examSchedules: result });
  } catch (error) {
    console.error("Error getting exam schedules:", error);
    res
      .status(500)
      .json({ error: "Error getting exam schedules", details: error.message });
  }
};
