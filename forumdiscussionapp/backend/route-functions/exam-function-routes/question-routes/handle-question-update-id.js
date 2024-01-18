import { sequelize } from "../../../db.js";

export const handleQuestionUpdateById = async (req, res) => {
  const { questionId } = req.params;
  const { questionText, questionTypeId, examId, courseId, createdByUserId } =
    req.body;

  const CommonAttributes = sequelize.models.CommonAttributes;
  const Questions = sequelize.models.Questions;

  try {
    // Find the CommonAttributeID associated with the Question
    const questionInstance = await Questions.findOne({
      where: { QuestionID: questionId },
    });

    if (!questionInstance) {
      console.error("Question not found");
      return res.status(404).json({ error: "Question not found" });
    }

    const commonAttributeId = questionInstance.get("CommonAttributeID");

    // Update the CommonAttributes table with the updated information
    await CommonAttributes.update(
      {
        UpdatedByUserID: createdByUserId,
      },
      { where: { AttributeID: commonAttributeId } }
    );

    // Update the Questions table
    const result = await Questions.update(
      {
        QuestionText: questionText,
        QuestionTypeID: questionTypeId,
        ExamID: examId,
        CourseID: courseId,
        CreatedByUserID: createdByUserId,
      },
      {
        where: { QuestionID: questionId },
      }
    );

    if (result[0] === 1) {
      console.log("Question updated successfully");
      res.json({ message: "Question updated successfully" });
    } else {
      console.error("Question update failed");
      res.status(500).json({ error: "Question update failed" });
    }
  } catch (error) {
    console.error("Error updating question:", error);
    res
      .status(500)
      .json({ error: "Question update failed", details: error.message });
  }
};
