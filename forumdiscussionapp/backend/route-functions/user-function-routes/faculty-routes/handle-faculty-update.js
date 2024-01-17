import { sequelize } from "../../../db.js";

export const handleFacultyUpdate = async (req, res) => {
  const { facultyId } = req.params;
  const { facultyName, departmentId } = req.body;

  try {
    // Dynamically access the FacultyMembers model using sequelize.models
    const FacultyMembers = sequelize.models.FacultyMembers;

    // Update the faculty member
    const [numberOfAffectedRows, affectedRows] = await FacultyMembers.update(
      {
        FacultyName: facultyName,
        DepartmentID: departmentId,
      },
      {
        where: { FacultyID: facultyId },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 1) {
      console.log("Faculty member updated successfully");
      res.json({
        message: "Faculty member updated successfully",
        faculty: affectedRows[0],
      });
    } else {
      console.error("Faculty member update failed");
      res.status(500).json({ error: "Faculty member update failed" });
    }
  } catch (error) {
    console.error("Error updating faculty member:", error);
    res
      .status(500)
      .json({ error: "Faculty member update failed", details: error.message });
  }
};
