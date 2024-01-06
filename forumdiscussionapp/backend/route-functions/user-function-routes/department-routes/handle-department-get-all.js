import { query } from "../../../db.js";

export const handleDepartmentGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM Departments";
    const [result] = await query(sql);

    console.log("Departments retrieved successfully");
    res.json({ departments: result });
  } catch (error) {
    console.error("Error getting departments:", error);
    res
      .status(500)
      .json({ error: "Error getting departments", details: error.message });
  }
};
