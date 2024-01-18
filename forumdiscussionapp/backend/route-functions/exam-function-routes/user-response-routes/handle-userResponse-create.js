import { sequelize } from "../../../db.js";

export const handleUserResponseCreate = async (req, res) => {
  const { userId, questionId, answerId } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      if (!userId || !questionId || !answerId) {
        console.log("UserID, QuestionID, and AnswerID are required");
        return res.status(400).json({
          error: "UserID, QuestionID, and AnswerID are required",
        });
      }

      // Get the UserResponses and CommonAttributes models
      const UserResponses = sequelize.models.UserResponses;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Create a new entry in CommonAttributes with CreatedByUserID
      const commonAttributesResult = await CommonAttributes.create(
        {
          CreatedByUserID: userId,
        },
        { transaction }
      );

      // Extract the AttributeID from the created entry
      const commonAttributeId = commonAttributesResult.AttributeID;

      // Create a new user response with CommonAttributeID
      const newUserResponse = await UserResponses.create(
        {
          UserID: userId,
          QuestionID: questionId,
          AnswerID: answerId,
          CommonAttributeID: commonAttributeId,
        },
        { transaction }
      );

      // Commit the transaction if everything is successful
      await transaction.commit();

      console.log("User response created successfully");
      res.json({ message: "User response created successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error creating user response:", error);
      res
        .status(500)
        .json({
          error: "User response creation failed",
          details: error.message,
        });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
