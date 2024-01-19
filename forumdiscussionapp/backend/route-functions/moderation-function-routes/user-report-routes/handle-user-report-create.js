import { sequelize } from "../../../db.js";

export const handleUserReportCreate = async (req, res) => {
  const { reporterId, reportedUserId, reportContent } = req.body;

  try {
    if (!reporterId || !reportedUserId || !reportContent) {
      console.log("ReporterId, ReportedUserId, and ReportContent are required");
      return res.status(400).json({
        error: "ReporterId, ReportedUserId, and ReportContent are required",
      });
    }

    // Dynamically access the UserReports and CommonAttributes models using sequelize.models
    const { UserReports, CommonAttributes } = sequelize.models;

    // Create a new CommonAttribute entry
    const commonAttribute = await CommonAttributes.create({
      CreatedByUserID: reporterId,
      UpdatedByUserID: null,
    });

    // Create a new UserReport with the CommonAttributeID
    const userReport = await UserReports.create({
      ReporterID: reporterId,
      ReportedUserID: reportedUserId,
      ReportContent: reportContent,
      CommonAttributeID: commonAttribute.AttributeID,
    });

    console.log("User report created successfully");
    res.json({ message: "User report created successfully" });
  } catch (error) {
    console.error("Error creating user report:", error);
    res
      .status(500)
      .json({ error: "User report creation failed", details: error.message });
  }
};
