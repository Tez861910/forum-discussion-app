import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handleRemoveUsersFromRole = async (req, res) => {
  const { roleId } = req.params;
  const { userIds } = req.body;

  try {
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or empty user IDs provided" });
    }

    // Dynamically access the models using sequelize.models
    const UserRoles = sequelize.models.UserRoles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch the user roles for the given user IDs and role ID
    const userRoles = await UserRoles.findAll({
      where: { RoleID: roleId, UserID: { [Op.in]: userIds } },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    if (!userRoles || userRoles.length === 0) {
      return res
        .status(404)
        .json({ error: "Enrollment not found or already removed" });
    }

    // Soft-delete the role assignments
    const commonAttributeIds = userRoles.map(
      (userRole) => userRole.CommonAttributeID
    );

    await CommonAttributes.update(
      { IsDeleted: true },
      { where: { AttributeID: { [Op.in]: commonAttributeIds } } }
    );

    console.log(`Users removed from the role ${roleId}.`);
    res.json({ message: "Users removed from the role successfully" });
  } catch (error) {
    console.error("Error removing users from role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
