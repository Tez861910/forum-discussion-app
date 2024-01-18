import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleExamGetByCourseId = async (req, res) => {
  const { courseId } = req.params;

  const Exams = sequelize.models.Exams;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const result = await Exams.findAll({
      where: {
        CourseID: courseId,
      },
      include: [
        {
          model: CommonAttributes,
          attributes: ["IsDeleted"],
        },
      ],
    });

    // Filter out exams that are marked as deleted in CommonAttributes
    const filteredExams = result.filter(
      (exam) => !exam.CommonAttribute.IsDeleted
    );

    console.log("Exams retrieved successfully for CourseID:", courseId);
    res.json(filteredExams);
  } catch (error) {
    console.error("Error getting exams for CourseID:", courseId, error);
    res
      .status(500)
      .json({ error: "Error getting exams", details: error.message });
  }
};
