import { sequelize } from "../../../db.js";

export const handleRolesGet = async (req, res) => {
  try {
    // Dynamically access the models using sequelize.models
    const Roles = sequelize.models.Roles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find all roles with associated CommonAttributes
    const roles = await Roles.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
        },
      ],
    });

    if (!Array.isArray(roles) || roles.length === 0) {
      console.error("No roles found in the database");
      return res.status(404).json({ error: "No roles found" });
    }

    // Map the roles data to include only necessary information
    const rolesData = roles.map((role) => ({
      roleId: role.RoleID,
      roleName: role.RoleName,
      roleDescription: role.RoleDescription,
      commonAttributeId: role.CommonAttributeID,
    }));

    console.log("Roles fetched successfully");
    res.status(200).json({ roles: rolesData });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      error: "Role retrieval failed",
      details: error.message,
    });
  }
};
