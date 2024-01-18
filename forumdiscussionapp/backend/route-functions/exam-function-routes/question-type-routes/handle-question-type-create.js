import { sequelize } from "../../../db.js";

export const handleQuestionTypeCreate = async (req, res) => {
  const { questionTypeName, createdByUserId } = req.body;

  try {
    if (!questionTypeName || !createdByUserId) {
      console.log("QuestionTypeName and CreatedByUserId are required");
      return res.status(400).json({
        error: "QuestionTypeName and CreatedByUserId are required",
      });
    }

    const QuestionTypes = sequelize.models.QuestionTypes;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Create a new CommonAttribute entry
    const commonAttribute = await CommonAttributes.create({
      CreatedByUserID: createdByUserId,
    });

    // Create a new QuestionType with associated CommonAttribute
    const newQuestionType = await QuestionTypes.create({
      QuestionTypeName: questionTypeName,
      CommonAttributeID: commonAttribute.AttributeID,
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
