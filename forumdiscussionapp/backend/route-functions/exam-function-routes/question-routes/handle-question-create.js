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

    const Questions = sequelize.models.Questions;
    const newQuestion = await Questions.create({
      QuestionText: questionText,
      QuestionTypeID: questionTypeId,
      ExamID: examId,
      CourseID: courseId,
      CreatedByUserID: createdByUserId,
    });

    if (newQuestion) {
      console.log("Question created successfully");
      res.json({ message: "Question created successfully" });
    } else {
      console.error("Question creation failed");
      res.status(500).json({ error: "Question creation failed" });
    }
  } catch (error) {
    console.error("Error creating question:", error);
    res
      .status(500)
      .json({ error: "Question creation failed", details: error.message });
  }
};
