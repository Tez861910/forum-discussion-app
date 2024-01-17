import { sequelize } from "../../../db.js";

export const handleDepartmentDelete = async (req, res) => {
  const { departmentId } = req.params;

  try {
    // Dynamically access the Departments model using sequelize.models
    const Departments = sequelize.models.Departments;

    // Delete the department
    const result = await Departments.destroy({
      where: { DepartmentID: departmentId },
    });

    if (result === 1) {
      console.log("Department deleted successfully");
      res.json({ message: "Department deleted successfully" });
    } else {
      console.error("Department deletion failed");
      res.status(500).json({ error: "Department deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    res
      .status(500)
      .json({ error: "Department deletion failed", details: error.message });
  }
};
