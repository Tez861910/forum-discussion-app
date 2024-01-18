import { sequelize } from "../../../db.js";

export const handleUserResponseUpdateById = async (req, res) => {
  const { userResponseId } = req.params;
  const { userId, questionId, answerId } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the UserResponses and CommonAttributes models
      const UserResponses = sequelize.models.UserResponses;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Update the user response
      const resultUpdate = await UserResponses.update(
        {
          UserID: userId,
          QuestionID: questionId,
          AnswerID: answerId,
        },
        {
          where: { UserResponseID: userResponseId },
          transaction,
        }
      );

      if (resultUpdate[0] !== 1) {
        // If no rows were updated, the user response doesn't exist
        console.error("User response not found for update");
        res.status(404).json({ error: "User response not found for update" });
        return;
      }

      // Get the CommonAttributeID from the updated user response
      const updatedUserResponse = await UserResponses.findByPk(userResponseId, {
        transaction,
      });
      const commonAttributeId = updatedUserResponse.CommonAttributeID;

      // Update CommonAttributes with UpdatedByUserID
      await CommonAttributes.update(
        {
          UpdatedByUserID: userId,
        },
        {
          where: {
            AttributeID: commonAttributeId,
          },
          transaction,
        }
      );

      // Commit the transaction if everything is successful
      await transaction.commit();

      console.log("User response updated successfully");
      res.json({ message: "User response updated successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error updating user response:", error);
      res
        .status(500)
        .json({ error: "User response update failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
