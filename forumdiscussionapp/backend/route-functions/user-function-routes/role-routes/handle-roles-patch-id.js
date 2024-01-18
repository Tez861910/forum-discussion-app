import { sequelize } from "../../../db.js";

export const handleRolesPatchId = async (req, res) => {
  const { id } = req.params;

  try {
    // Dynamically access the Roles and CommonAttributes models using sequelize.models
    const Roles = sequelize.models.Roles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Check if the role with the provided ID exists
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

    // Soft-delete the role
    const commonAttributes = await CommonAttributes.findOne({
      where: { AttributeID: role.CommonAttributeID },
    });
    commonAttributes.IsDeleted = true;
    await commonAttributes.save();

    console.log("Role soft-deleted successfully");
    res.json({ message: "Role soft-deleted successfully" });
  } catch (error) {
    console.error("Error soft-deleting role:", error);
    res
      .status(500)
      .json({ error: "Role soft-deletion failed", details: error.message });
  }
};
