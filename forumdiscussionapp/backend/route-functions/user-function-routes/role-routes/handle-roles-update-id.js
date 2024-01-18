import { sequelize } from "../../../db.js";

export const handleRolesUpdateId = async (req, res) => {
  const { id } = req.params;
  const { roleName, roleDescription } = req.body;

  try {
    // Dynamically access the Roles and CommonAttributes models using sequelize.models
    const Roles = sequelize.models.Roles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    if (!roleName) {
      console.log("Role name is required");
      return res.status(400).json({ error: "Role name is required" });
    }

    // Check if the role with the provided ID exists and is not deleted
    const role = await Roles.findOne({
      where: { RoleID: id },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
        },
      ],
    });

    if (!role) {
      console.error("Role not found");
      return res.status(404).json({ error: "Role not found" });
    }

    // Update the role
    role.RoleName = roleName;
    role.RoleDescription = roleDescription;
    await role.save();

    console.log("Role updated successfully");
    res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error);
    res
      .status(500)
      .json({ error: "Role update failed", details: error.message });
  }
};
