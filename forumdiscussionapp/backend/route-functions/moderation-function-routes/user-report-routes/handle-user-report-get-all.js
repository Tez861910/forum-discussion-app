import { sequelize } from "../../../db.js";

export const handleUserReportGetAll = async (req, res) => {
  try {
    // Dynamically access the UserReports model using sequelize.models
    const UserReports = sequelize.models.UserReports;

    const userReports = await UserReports.findAll();

    console.log("User reports retrieved successfully");
    res.json({ userReports });
  } catch (error) {
    console.error("Error getting user reports:", error);
    res
      .status(500)
      .json({ error: "Error getting user reports", details: error.message });
  }
};
