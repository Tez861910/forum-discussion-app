import { sequelize } from "../../../db.js";

export const handleAnswerCreate = async (req, res) => {
  const { questionId, answerText, createdByUserId } = req.body;

  try {
    if (!questionId || !answerText || !createdByUserId) {
      console.log("QuestionID, AnswerText, and CreatedByUserId are required");
      return res.status(400).json({
        error: "QuestionID, AnswerText, and CreatedByUserId are required",
      });
    }

    const Answers = sequelize.models.Answers;
    const result = await Answers.create({
      QuestionID: questionId,
      AnswerText: answerText,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("Answer created successfully");
      res.json({ message: "Answer created successfully" });
    } else {
      console.error("Answer creation failed");
      res.status(500).json({ error: "Answer creation failed" });
    }
  } catch (error) {
    console.error("Error creating answer:", error);
    res
      .status(500)
      .json({ error: "Answer creation failed", details: error.message });
  }
};
