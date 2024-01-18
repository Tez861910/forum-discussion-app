import { sequelize } from "../../../db.js";

export const handleResultUpdate = async (req, res) => {
  const { resultId } = req.params;
  const { userId, examId, totalScore, percentage, additionalMetrics } =
    req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the Results and CommonAttributes models
      const Results = sequelize.models.Results;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Update the result
      const resultUpdate = await Results.update(
        {
          UserID: userId,
          ExamID: examId,
          TotalScore: totalScore,
          Percentage: percentage,
          AdditionalMetrics: additionalMetrics,
        },
        {
          where: { ResultID: resultId },
          transaction,
        }
      );

      if (resultUpdate[0] !== 1) {
        // If no rows were updated, the result doesn't exist
        console.error("Exam result not found for update");
        res.status(404).json({ error: "Exam result not found for update" });
        return;
      }

      // Get the CommonAttributeID from the updated result
      const updatedResult = await Results.findByPk(resultId, { transaction });
      const commonAttributeId = updatedResult.CommonAttributeID;

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

      console.log("Exam result updated successfully");
      res.json({ message: "Exam result updated successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error updating exam result:", error);
      res
        .status(500)
        .json({ error: "Exam result update failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
