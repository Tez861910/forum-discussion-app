import { UserReports } from "../../../db.js";

export const handleUserReportCreate = async (req, res) => {
  const { reporterId, reportedUserId, reportContent } = req.body;

  try {
    if (!reporterId || !reportedUserId || !reportContent) {
      console.log("ReporterId, ReportedUserId, and ReportContent are required");
      return res.status(400).json({
        error: "ReporterId, ReportedUserId, and ReportContent are required",
      });
    }

    // Create a new UserReport
    const userReport = await UserReports.create({
      ReporterID: reporterId,
      ReportedUserID: reportedUserId,
      ReportContent: reportContent,
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
