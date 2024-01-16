import { sequelize } from "../../../db.js";

export const handleMCQOptionCreate = async (req, res) => {
  const { mcqQuestionId, mcqOptionText, isCorrect, createdByUserId } = req.body;

  try {
    const MCQOptions = sequelize.models.MCQOptions;
    const result = await MCQOptions.create({
      MCQQuestionID: mcqQuestionId,
      MCQOptionText: mcqOptionText,
      IsCorrect: isCorrect,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("MCQ option created successfully");
      res.json({ message: "MCQ option created successfully" });
    } else {
      console.error("MCQ option creation failed");
      res.status(500).json({ error: "MCQ option creation failed" });
    }
  } catch (error) {
    console.error("Error creating MCQ option:", error);
    res
      .status(500)
      .json({ error: "MCQ option creation failed", details: error.message });
  }
};
