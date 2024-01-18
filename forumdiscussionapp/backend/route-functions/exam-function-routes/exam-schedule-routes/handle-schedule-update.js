import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleScheduleUpdate = async (req, res) => {
  const { scheduleId } = req.params;
  const { examId, startTime, endTime, createdByUserId } = req.body;

  try {
    const ExamSchedules = sequelize.models.ExamSchedules;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Update the exam schedule
    const result = await ExamSchedules.update(
      {
        ExamID: examId,
        StartTime: startTime,
        EndTime: endTime,
        CreatedByUserID: createdByUserId,
      },
      {
        where: {
          ScheduleID: scheduleId,
        },
      }
    );

    // Update the CommonAttributes table with the updated information
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: {
        AttributeID: Sequelize.col("ExamSchedules.CommonAttributeID"),
      },
      include: [
        {
          model: ExamSchedules,
          where: { ScheduleID: scheduleId },
          attributes: [],
        },
      ],
    });

    await CommonAttributes.update(
      { UpdatedByUserID: createdByUserId },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    if (result[0] === 1) {
      console.log("Exam schedule updated successfully");
      res.json({ message: "Exam schedule updated successfully" });
    } else {
      console.error("Exam schedule update failed");
      res.status(500).json({ error: "Exam schedule update failed" });
    }
  } catch (error) {
    console.error("Error updating exam schedule:", error);
    res
      .status(500)
      .json({ error: "Exam schedule update failed", details: error.message });
  }
};
