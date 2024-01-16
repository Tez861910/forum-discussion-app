import { sequelize } from "../../../db.js";

export const handleUserReportDelete = async (req, res) => {
  const { reportId } = req.params;

  try {
    // Dynamically access the UserReports model using sequelize.models
    const UserReports = sequelize.models.UserReports;

    // Delete the user report
    const result = await UserReports.destroy({
      where: { ReportID: reportId },
    });

    if (result === 1) {
      console.log("User report deleted successfully");
      res.json({ message: "User report deleted successfully" });
    } else {
      console.error("User report deletion failed");
      res.status(500).json({ error: "User report deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting user report:", error);
    res
      .status(500)
      .json({ error: "User report deletion failed", details: error.message });
  }
};
