import { query } from "../../../db.js";

export const handleDepartmentUpdate = async (req, res) => {
  const { departmentId } = req.params;
  const { departmentName, departmentDescription } = req.body;

  try {
    const sql =
      "UPDATE Departments SET DepartmentName = ?, DepartmentDescription = ? WHERE DepartmentID = ?";
    const [result] = await query(sql, [
      departmentName,
      departmentDescription,
      departmentId,
    ]);

    if (result.affectedRows === 1) {
      console.log("Department updated successfully");
      res.json({ message: "Department updated successfully" });
    } else {
      console.error("Department update failed");
      res.status(500).json({ error: "Department update failed" });
    }
  } catch (error) {
    console.error("Error updating department:", error);
    res
      .status(500)
      .json({ error: "Department update failed", details: error.message });
  }
};
