import { sequelize } from "../../../db.js";

export const handleExamUpdateById = async (req, res) => {
  const { examId } = req.params;
  const { examName, examStatus, examDuration, instructions, courseId } =
    req.body;
  const UserID = req.user.userId;

  const Exams = sequelize.models.Exams;
  const CommonAttributes = sequelize.models.CommonAttributes;

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
      // Find the CommonAttributeID associated with the updated exam
      const updatedExamInstance = await Exams.findOne({
        where: { ExamID: examId },
        attributes: ["CommonAttributeID"],
      });

      // Update the CommonAttributes table with the updated information
      await CommonAttributes.update(
        { UpdatedByUserID: UserID },
        { where: { AttributeID: updatedExamInstance.get("CommonAttributeID") } }
      );

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
