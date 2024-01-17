import { sequelize } from "../../../db.js";

export const handleDepartmentUpdate = async (req, res) => {
  const { departmentId } = req.params;
  const { departmentName, departmentDescription } = req.body;

  try {
    // Dynamically access the Departments model using sequelize.models
    const Departments = sequelize.models.Departments;

    // Update the department
    const [numberOfAffectedRows, affectedRows] = await Departments.update(
      {
        DepartmentName: departmentName,
        DepartmentDescription: departmentDescription,
      },
      {
        where: { DepartmentID: departmentId },
        returning: true,
      }
    );

    if (numberOfAffectedRows === 1) {
      console.log("Department updated successfully");
      res.json({
        message: "Department updated successfully",
        department: affectedRows[0],
      });
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
