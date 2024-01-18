import { sequelize } from "../../../db.js";

export const handleResultCreate = async (req, res) => {
  const { userId, examId, totalScore, percentage, additionalMetrics } =
    req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the CommonAttributes model
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

      // Get the Results model
      const Results = sequelize.models.Results;

      // Create a new result with CommonAttributeID
      const newResult = await Results.create(
        {
          UserID: userId,
          ExamID: examId,
          TotalScore: totalScore,
          Percentage: percentage,
          AdditionalMetrics: additionalMetrics,
          CommonAttributeID: commonAttributeId,
        },
        { transaction }
      );

      // Commit the transaction if everything is successful
      await transaction.commit();

      console.log("Exam result created successfully");
      res.json({ message: "Exam result created successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error creating exam result:", error);
      res
        .status(500)
        .json({ error: "Exam result creation failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
