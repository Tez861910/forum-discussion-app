import { sequelize } from "../../../db.js";

export const handleFacultyGetAll = async (req, res) => {
  try {
    // Dynamically access the FacultyMembers model using sequelize.models
    const FacultyMembers = sequelize.models.FacultyMembers;

    const facultyMembers = await FacultyMembers.findAll();

    console.log("Faculty members retrieved successfully");
    res.json({ facultyMembers });
  } catch (error) {
    console.error("Error getting faculty members:", error);
    res
      .status(500)
      .json({ error: "Error getting faculty members", details: error.message });
  }
};
