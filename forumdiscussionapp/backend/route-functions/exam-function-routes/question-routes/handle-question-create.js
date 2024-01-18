import { sequelize } from "../../../db.js";

export const handleQuestionCreate = async (req, res) => {
  const { questionText, questionTypeId, examId, courseId, createdByUserId } =
    req.body;

  try {
    if (
      !questionText ||
      !questionTypeId ||
      !examId ||
      !courseId ||
      !createdByUserId
    ) {
      console.log(
        "QuestionText, QuestionTypeId, ExamId, CourseId, and CreatedByUserId are required"
      );
      return res.status(400).json({
        error:
          "QuestionText, QuestionTypeId, ExamId, CourseId, and CreatedByUserId are required",
      });
    }

    const CommonAttributes = sequelize.models.CommonAttributes;
    const Questions = sequelize.models.Questions;

    // Insert into CommonAttributes table with CreatedByUserID
    const commonAttributesInstance = await CommonAttributes.create({
      CreatedByUserID: createdByUserId,
    });

    // Insert into Questions table with CommonAttributeID and other data
    const newQuestion = await Questions.create({
      QuestionText: questionText,
      QuestionTypeID: questionTypeId,
      ExamID: examId,
      CourseID: courseId,
      CommonAttributeID: commonAttributesInstance.get("AttributeID"),
    });

    if (newQuestion) {
      console.log("Question created successfully");
      res.json({ success: true, message: "Question created successfully" });
    } else {
      console.error("Question creation failed");
      res
        .status(500)
        .json({ success: false, error: "Question creation failed" });
    }
  } catch (error) {
    console.error("Error creating question:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Question creation failed",
        details: error.message,
      });
  }
};
