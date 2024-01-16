import { sequelize } from "../../../db.js";

export const handleMCQOptionUpdateById = async (req, res) => {
  const { mcqOptionId } = req.params;
  const { mcqQuestionId, mcqOptionText, isCorrect, createdByUserId } = req.body;

  try {
    const MCQOptions = sequelize.models.MCQOptions;
    const result = await MCQOptions.update(
      {
        MCQQuestionID: mcqQuestionId,
        MCQOptionText: mcqOptionText,
        IsCorrect: isCorrect,
        CreatedByUserID: createdByUserId,
      },
      {
        where: {
          MCQOptionID: mcqOptionId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("MCQ option updated successfully");
      res.json({ message: "MCQ option updated successfully" });
    } else {
      console.error("MCQ option update failed");
      res.status(500).json({ error: "MCQ option update failed" });
    }
  } catch (error) {
    console.error("Error updating MCQ option:", error);
    res
      .status(500)
      .json({ error: "MCQ option update failed", details: error.message });
  }
};
