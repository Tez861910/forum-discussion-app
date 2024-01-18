import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleAttemptUpdate = async (req, res) => {
  const { attemptId } = req.params;
  const { userId, examId, startTime, endTime, status } = req.body;

  const ExamAttempts = sequelize.models.ExamAttempts;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const [result] = await ExamAttempts.update(
      {
        UserID: userId,
        ExamID: examId,
        StartTime: startTime,
        EndTime: endTime,
        Status: status,
      },
      {
        where: {
          AttemptID: attemptId,
        },
        returning: true, // Ensure it returns the updated row
      }
    );

    if (result[0] === 1) {
      // Get the CommonAttributeID from the updated ExamAttempts row
      const commonAttributeId = result[1][0].CommonAttributeID;

      // Update UpdatedByUserID in the CommonAttributes table
      await CommonAttributes.update(
        { UpdatedByUserID: userId },
        { where: { AttributeID: commonAttributeId } }
      );

      console.log("Exam attempt updated successfully");
      res.json({ message: "Exam attempt updated successfully" });
    } else {
      console.error("Exam attempt update failed");
      res.status(500).json({ error: "Exam attempt update failed" });
    }
  } catch (error) {
    console.error("Error updating exam attempt:", error);
    res
      .status(500)
      .json({ error: "Exam attempt update failed", details: error.message });
  }
};
