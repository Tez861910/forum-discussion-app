import { sequelize } from "../../../db.js";

export const handleQuestionTypeCreate = async (req, res) => {
  const { questionTypeName } = req.body;

  try {
    if (!questionTypeName) {
      console.log("QuestionTypeName is required");
      return res.status(400).json({ error: "QuestionTypeName is required" });
    }

    const QuestionTypes = sequelize.models.QuestionTypes;
    const newQuestionType = await QuestionTypes.create({
      QuestionTypeName: questionTypeName,
    });

    if (newQuestionType) {
      console.log("Question type created successfully");
      res.json({ message: "Question type created successfully" });
    } else {
      console.error("Question type creation failed");
      res.status(500).json({ error: "Question type creation failed" });
    }
  } catch (error) {
    console.error("Error creating question type:", error);
    res
      .status(500)
      .json({ error: "Question type creation failed", details: error.message });
  }
};
