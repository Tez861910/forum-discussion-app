import { sequelize } from "../../../db.js";

export const handleExamDeleteById = async (req, res) => {
  const { examId } = req.params;

  const Exams = sequelize.models.Exams;

  try {
    const result = await Exams.destroy({
      where: {
        ExamID: examId,
      },
    });

    if (result === 1) {
      console.log("Exam deleted successfully");
      res.json({ message: "Exam deleted successfully" });
    } else {
      console.error("Exam deletion failed");
      res.status(500).json({ error: "Exam deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam:", error);
    res
      .status(500)
      .json({ error: "Error deleting exam", details: error.message });
  }
};
