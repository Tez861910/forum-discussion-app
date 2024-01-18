import { sequelize } from "../../../db.js";

export const handleResultDelete = async (req, res) => {
  const { resultId } = req.params;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the Results and CommonAttributes models
      const Results = sequelize.models.Results;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Find the result to be soft-deleted
      const result = await Results.findByPk(resultId, { transaction });

      if (!result) {
        console.error("Exam result not found for deletion");
        res.status(404).json({ error: "Exam result not found for deletion" });
        return;
      }

      // Get the CommonAttributeID from the result
      const commonAttributeId = result.CommonAttributeID;

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

      console.log("Exam result soft-deleted successfully");
      res.json({ message: "Exam result soft-deleted successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error soft-deleting exam result:", error);
      res.status(500).json({
        error: "Exam result soft-deletion failed",
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
