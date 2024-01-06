import { query } from "../../../db.js";

export const handleDepartmentCreate = async (req, res) => {
  const { departmentName, departmentDescription } = req.body;

  try {
    const sql =
      "INSERT INTO Departments (DepartmentName, DepartmentDescription) VALUES (?, ?)";
    const [result] = await query(sql, [departmentName, departmentDescription]);

    if (result.affectedRows === 1) {
      console.log("Department created successfully");
      res.json({ message: "Department created successfully" });
    } else {
      console.error("Department creation failed");
      res.status(500).json({ error: "Department creation failed" });
    }
  } catch (error) {
    console.error("Error creating department:", error);
    res
      .status(500)
      .json({ error: "Department creation failed", details: error.message });
  }
};
