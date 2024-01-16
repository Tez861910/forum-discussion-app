import { sequelize } from "../../../db.js";

export const handleAnswerUpdateById = async (req, res) => {
  const { answerId } = req.params;
  const { questionId, answerText, createdByUserId } = req.body;

  const Answers = sequelize.models.Answers;

  try {
    const result = await Answers.update(
      {
        QuestionID: questionId,
        AnswerText: answerText,
        CreatedByUserID: createdByUserId,
      },
      {
        where: {
          AnswerID: answerId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("Answer updated successfully");
      res.json({ message: "Answer updated successfully" });
    } else {
      console.error("Answer update failed");
      res.status(500).json({ error: "Answer update failed" });
    }
  } catch (error) {
    console.error("Error updating answer:", error);
    res
      .status(500)
      .json({ error: "Answer update failed", details: error.message });
  }
};
