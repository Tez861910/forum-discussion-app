import { sequelize } from "../../../db.js";

export const handleQuestionTypeUpdateById = async (req, res) => {
  const { questionTypeId } = req.params;
  const { questionTypeName, userId } = req.body;

  try {
    const QuestionTypes = sequelize.models.QuestionTypes;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the question type to get the associated CommonAttributeID
    const questionType = await QuestionTypes.findOne({
      where: { QuestionTypeID: questionTypeId },
    });

    if (!questionType) {
      console.error("Question type not found");
      return res.status(404).json({ error: "Question type not found" });
    }

    // Update the QuestionTypes table
    const questionTypeUpdate = await QuestionTypes.update(
      {
        QuestionTypeName: questionTypeName,
      },
      {
        where: { QuestionTypeID: questionTypeId },
      }
    );

    if (questionTypeUpdate[0] === 1) {
      // Update the CommonAttributes table to mark as updated
      const commonAttributeUpdate = await CommonAttributes.update(
        {
          UpdatedByUserID: userId,
        },
        {
          where: { AttributeID: questionType.CommonAttributeID },
        }
      );

      if (commonAttributeUpdate[0] === 1) {
        console.log("Question type updated successfully");
        res.json({ message: "Question type updated successfully" });
      } else {
        console.error("Common attribute update failed");
        res.status(500).json({ error: "Common attribute update failed" });
      }
    } else {
      console.error("Question type update failed");
      res.status(500).json({ error: "Question type update failed" });
    }
  } catch (error) {
    console.error("Error updating question type:", error);
    res
      .status(500)
      .json({ error: "Error updating question type", details: error.message });
  }
};
