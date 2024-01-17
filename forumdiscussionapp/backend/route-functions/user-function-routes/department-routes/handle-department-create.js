import { sequelize } from "../../../db.js";

export const handleDepartmentCreate = async (req, res) => {
  const { departmentName, departmentDescription } = req.body;

  try {
    // Dynamically access the Departments model using sequelize.models
    const Departments = sequelize.models.Departments;

    // Create a new Department
    const department = await Departments.create({
      DepartmentName: departmentName,
      DepartmentDescription: departmentDescription,
    });

    console.log("Department created successfully");
    res.json({ message: "Department created successfully" });
  } catch (error) {
    console.error("Error creating department:", error);
    res
      .status(500)
      .json({ error: "Department creation failed", details: error.message });
  }
};
