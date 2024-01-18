import { sequelize } from "../../../db.js";

export const handleScheduleCreate = async (req, res) => {
  const { examId, startTime, endTime, createdByUserId } = req.body;

  const ExamSchedules = sequelize.models.ExamSchedules;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Create a transaction to ensure atomicity
    const result = await sequelize.transaction(async (t) => {
      // Create a CommonAttributes entry with CreatedByUserID
      const commonAttributesResult = await CommonAttributes.create(
        {
          CreatedByUserID: createdByUserId,
        },
        { transaction: t }
      );

      // Use the newly created AttributeID as CommonAttributeID in ExamSchedules
      const examScheduleResult = await ExamSchedules.create(
        {
          ExamID: examId,
          StartTime: startTime,
          EndTime: endTime,
          CommonAttributeID: commonAttributesResult.AttributeID,
        },
        { transaction: t }
      );

      return examScheduleResult;
    });

    if (result) {
      console.log("Exam schedule created successfully");
      res.json({ message: "Exam schedule created successfully" });
    } else {
      console.error("Exam schedule creation failed");
      res.status(500).json({ error: "Exam schedule creation failed" });
    }
  } catch (error) {
    console.error("Error creating exam schedule:", error);
    res
      .status(500)
      .json({ error: "Exam schedule creation failed", details: error.message });
  }
};
