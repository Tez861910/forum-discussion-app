import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleScheduleDelete = async (req, res) => {
  const { scheduleId } = req.params;
  const UserID = req.user.userId;

  const ExamSchedules = sequelize.models.ExamSchedules;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Check if the schedule is already deleted
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

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the schedule is already marked as deleted, return success (no need to delete again)
      return res.json({
        success: true,
        message: "Exam schedule already deleted",
      });
    }

    // Update the IsDeleted and DeletedByUserID fields in the CommonAttributes table
    const result = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: UserID,
      },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    if (result[0] === 1) {
      console.log("Exam schedule deleted successfully");
      res.json({
        success: true,
        message: "Exam schedule deleted successfully",
      });
    } else {
      console.error("Exam schedule deletion failed");
      res
        .status(500)
        .json({ success: false, error: "Exam schedule deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam schedule:", error);
    res.status(500).json({
      success: false,
      error: "Exam schedule deletion failed",
      details: error.message,
    });
  }
};
