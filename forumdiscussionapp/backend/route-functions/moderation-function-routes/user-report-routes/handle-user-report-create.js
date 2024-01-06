import { query } from "../../../db.js";

export const handleUserReportCreate = async (req, res) => {
  const { reporterId, reportedUserId, reportContent } = req.body;

  try {
    if (!reporterId || !reportedUserId || !reportContent) {
      console.log("ReporterId, ReportedUserId, and ReportContent are required");
      return res
        .status(400)
        .json({
          error: "ReporterId, ReportedUserId, and ReportContent are required",
        });
    }

    const sql =
      "INSERT INTO UserReports (ReporterID, ReportedUserID, ReportContent) VALUES (?, ?, ?)";
    const [result] = await query(sql, [
      reporterId,
      reportedUserId,
      reportContent,
    ]);

    if (result.affectedRows === 1) {
      console.log("User report created successfully");
      res.json({ message: "User report created successfully" });
    } else {
      console.error("User report creation failed");
      res.status(500).json({ error: "User report creation failed" });
    }
  } catch (error) {
    console.error("Error creating user report:", error);
    res
      .status(500)
      .json({ error: "User report creation failed", details: error.message });
  }
};
