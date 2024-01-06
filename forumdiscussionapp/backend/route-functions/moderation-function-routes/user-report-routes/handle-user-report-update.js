import { query } from "../../../db.js";

export const handleUserReportUpdate = async (req, res) => {
  const { reportId } = req.params;
  const { reporterId, reportedUserId, reportContent, isResolved } = req.body;

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
      "UPDATE UserReports SET ReporterID = ?, ReportedUserID = ?, ReportContent = ?, IsResolved = ? WHERE ReportID = ?";
    const [result] = await query(sql, [
      reporterId,
      reportedUserId,
      reportContent,
      isResolved,
      reportId,
    ]);

    if (result.affectedRows === 1) {
      console.log("User report updated successfully");
      res.json({ message: "User report updated successfully" });
    } else {
      console.error("User report update failed");
      res.status(500).json({ error: "User report update failed" });
    }
  } catch (error) {
    console.error("Error updating user report:", error);
    res
      .status(500)
      .json({ error: "User report update failed", details: error.message });
  }
};
