import { sequelize } from "../../../db.js";

export const handleFacultyCreate = async (req, res) => {
  const { facultyName, departmentId } = req.body;

  try {
    // Dynamically access the FacultyMembers model using sequelize.models
    const FacultyMembers = sequelize.models.FacultyMembers;

    // Create a new FacultyMember
    const facultyMember = await FacultyMembers.create({
      FacultyName: facultyName,
      DepartmentID: departmentId,
    });

    console.log("Faculty member created successfully");
    res.json({ message: "Faculty member created successfully" });
  } catch (error) {
    console.error("Error creating faculty member:", error);
    res.status(500).json({
      error: "Faculty member creation failed",
      details: error.message,
    });
  }
};
