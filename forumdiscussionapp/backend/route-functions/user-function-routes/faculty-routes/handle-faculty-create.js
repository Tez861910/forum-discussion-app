import { query } from "../../../db.js";

export const handleFacultyCreate = async (req, res) => {
  const { facultyName, departmentId } = req.body;

  try {
    const sql =
      "INSERT INTO FacultyMembers (FacultyName, DepartmentID) VALUES (?, ?)";
    const [result] = await query(sql, [facultyName, departmentId]);

    if (result.affectedRows === 1) {
      console.log("Faculty member created successfully");
      res.json({ message: "Faculty member created successfully" });
    } else {
      console.error("Faculty member creation failed");
      res.status(500).json({ error: "Faculty member creation failed" });
    }
  } catch (error) {
    console.error("Error creating faculty member:", error);
    res
      .status(500)
      .json({
        error: "Faculty member creation failed",
        details: error.message,
      });
  }
};
