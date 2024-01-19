import { sequelize } from "../../../db.js";

export const handleUserReportDelete = async (req, res) => {
  const { reportId, userId } = req.params;

  try {
    // Dynamically access the UserReports and CommonAttributes models using sequelize.models
    const { UserReports, CommonAttributes } = sequelize.models;

    // Find the UserReport to get the associated CommonAttributeID
    const userReport = await UserReports.findOne({
      where: { ReportID: reportId },
      attributes: ["CommonAttributeID"],
    });

    if (!userReport) {
      console.error("User report not found");
      return res.status(404).json({ error: "User report not found" });
    }

    // Update the CommonAttributes table with isDeleted and deletedByUserID
    await CommonAttributes.update(
      {
        isDeleted: true,
        deletedByUserID: userId,
      },
      { where: { AttributeID: userReport.CommonAttributeID } }
    );

    // Return a response indicating successful deletion
    console.log("User report deleted successfully");
    res.json({ message: "User report deleted successfully" });
  } catch (error) {
    console.error("Error deleting user report:", error);
    res
      .status(500)
      .json({ error: "User report deletion failed", details: error.message });
  }
};
