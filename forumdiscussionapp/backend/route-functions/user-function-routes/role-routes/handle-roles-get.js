import { Roles, CommonAttributes } from "../../../db.js";

export const handleRolesGet = async (req, res) => {
  try {
    const roles = await Roles.findAll({
      include: [
        {
          model: CommonAttributes,
          as: "commonAttributes",
          where: { IsDeleted: false },
        },
      ],
    });

    if (!Array.isArray(roles) || roles.length === 0) {
      console.error("No roles found in the database");
      return res.status(404).json({ error: "No roles found" });
    }

    const rolesData = roles.map((role) => ({
      roleId: role.RoleID,
      roleName: role.RoleName,
      roleDescription: role.RoleDescription,
      commonAttributeId: role.CommonAttributeID,
      commonAttributeIsDeleted: role.commonAttributes.IsDeleted,
    }));

    console.log("Roles fetched successfully");
    res.status(200).json({ roles: rolesData });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res
      .status(500)
      .json({ error: "Role retrieval failed", details: error.message });
  }
};
