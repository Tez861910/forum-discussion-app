import { sequelize } from "../../../db.js";

export const handleUserResponseDeleteById = async (req, res) => {
  const { userResponseId } = req.params;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the UserResponses and CommonAttributes models
      const UserResponses = sequelize.models.UserResponses;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Find the user response to be soft-deleted
      const userResponse = await UserResponses.findByPk(userResponseId, {
        transaction,
      });

      if (!userResponse) {
        console.error("User response not found for deletion");
        res.status(404).json({ error: "User response not found for deletion" });
        return;
      }

      // Get the CommonAttributeID from the user response
      const commonAttributeId = userResponse.CommonAttributeID;

      // Update CommonAttributes for soft deletion
      await CommonAttributes.update(
        {
          IsDeleted: true,
          DeletedByUserID: req.body.userId,
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

      console.log("User response soft-deleted successfully");
      res.json({ message: "User response soft-deleted successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error soft-deleting user response:", error);
      res.status(500).json({
        error: "User response soft-deletion failed",
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
