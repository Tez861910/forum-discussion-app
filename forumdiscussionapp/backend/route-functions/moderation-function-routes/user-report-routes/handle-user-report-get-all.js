import { sequelize } from "../../../db.js";

export const handleUserReportGetAll = async (req, res) => {
  try {
    // Dynamically access the UserReports and CommonAttributes models using sequelize.models
    const { UserReports, CommonAttributes } = sequelize.models;

    // Retrieve user reports with isDeleted false by joining with CommonAttributes
    const userReports = await UserReports.findAll({
      include: {
        model: CommonAttributes,
        where: { isDeleted: false },
        required: true,
      },
    });

    console.log("User reports retrieved successfully");
    res.json({ userReports });
  } catch (error) {
    console.error("Error getting user reports:", error);
    res
      .status(500)
      .json({ error: "Error getting user reports", details: error.message });
  }
};
