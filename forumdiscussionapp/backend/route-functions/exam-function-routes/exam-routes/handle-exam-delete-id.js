import { sequelize } from "../../../db.js";

export const handleExamDeleteById = async (req, res) => {
  const { examId } = req.params;
  const UserID = req.user.userId;

  const Exams = sequelize.models.Exams;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Find the CommonAttributeID associated with the exam
    const examInstance = await Exams.findOne({
      where: { ExamID: examId },
      attributes: ["CommonAttributeID"],
    });

    if (!examInstance) {
      console.error("Exam not found");
      return res.status(404).json({ error: "Exam not found" });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: UserID },
      { where: { AttributeID: examInstance.get("CommonAttributeID") } }
    );

    console.log("Exam deleted successfully");
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res
      .status(500)
      .json({ error: "Error deleting exam", details: error.message });
  }
};
