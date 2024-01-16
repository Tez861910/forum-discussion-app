import { sequelize } from "../../../db.js";

export const handleExamUpdateById = async (req, res) => {
  const { examId } = req.params;
  const { examName, examStatus, examDuration, instructions, courseId } =
    req.body;

  const Exams = sequelize.models.Exams;

  try {
    const result = await Exams.update(
      {
        ExamName: examName,
        ExamStatus: examStatus,
        ExamDuration: examDuration,
        Instructions: instructions,
        CourseID: courseId,
      },
      {
        where: {
          ExamID: examId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("Exam updated successfully");
      res.json({ message: "Exam updated successfully" });
    } else {
      console.error("Exam update failed");
      res.status(500).json({ error: "Exam update failed" });
    }
  } catch (error) {
    console.error("Error updating exam:", error);
    res
      .status(500)
      .json({ error: "Exam update failed", details: error.message });
  }
};
