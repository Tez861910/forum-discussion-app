import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleAnswerUpdateById = async (req, res) => {
  const { answerId } = req.params;
  const { questionId, answerText, createdByUserId } = req.body;

  const Answers = sequelize.models.Answers;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Check if the answer is marked as deleted in CommonAttributes
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: { AttributeID: Sequelize.col("Answers.CommonAttributeID") },
      include: [
        {
          model: Answers,
          where: { AnswerID: answerId },
          attributes: [],
        },
      ],
    });

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the answer is marked as deleted, return an error
      return res
        .status(400)
        .json({ success: false, error: "Cannot update a deleted answer" });
    }

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
      // Update the CommonAttributes table with the updated information
      await CommonAttributes.update(
        { UpdatedByUserID: createdByUserId },
        { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
      );

      console.log("Answer updated successfully");
      res.json({ success: true, message: "Answer updated successfully" });
    } else {
      console.error("Answer update failed");
      res.status(500).json({ success: false, error: "Answer update failed" });
    }
  } catch (error) {
    console.error("Error updating answer:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Answer update failed",
        details: error.message,
      });
  }
};
