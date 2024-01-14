import { Departments } from "../../../db.js";

export const handleDepartmentGetAll = async (req, res) => {
  try {
    const departments = await Departments.findAll();

    console.log("Departments retrieved successfully");
    res.json({ departments });
  } catch (error) {
    console.error("Error getting departments:", error);
    res
      .status(500)
      .json({ error: "Error getting departments", details: error.message });
  }
};
