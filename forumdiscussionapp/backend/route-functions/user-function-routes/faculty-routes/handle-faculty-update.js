import { query } from "../../../db.js";

export const handleFacultyUpdate = async (req, res) => {
  const { facultyId } = req.params;
  const { facultyName, departmentId } = req.body;

  try {
    const sql =
      "UPDATE FacultyMembers SET FacultyName = ?, DepartmentID = ? WHERE FacultyID = ?";
    const [result] = await query(sql, [facultyName, departmentId, facultyId]);

    if (result.affectedRows === 1) {
      console.log("Faculty member updated successfully");
      res.json({ message: "Faculty member updated successfully" });
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
