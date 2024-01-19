import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handleRolesIdEnroll = async (req, res) => {
  const { userIds } = req.body;
  const { roleId } = req.params;
  const { createdByUserId } = req.body;

  try {
    // Dynamically access the models using sequelize.models
    const UserRoles = sequelize.models.UserRoles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Create a CommonAttributes entry
    const commonAttributes = await CommonAttributes.create({
      CreatedByUserID: createdByUserId,
    });

    // Check if any of the users already has the role
    const existingRoles = await UserRoles.findAll({
      where: {
        RoleID: roleId,
        UserID: { [Op.in]: userIds },
      },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    // Check if the role assignment already exists for any user
    if (existingRoles && existingRoles.length > 0) {
      const existingUserIds = existingRoles.map((role) => role.UserID);
      return res.status(400).json({
        error: "Some users already have the specified role",
        existingUserIds,
      });
    }

    // Assign the role to each user
    const values = userIds.map((userId) => ({
      UserID: userId,
      RoleID: roleId,
      CommonAttributeID: commonAttributes.AttributeID,
    }));
    await UserRoles.bulkCreate(values);

    console.log("Role assigned to the users successfully");
    res.json({ message: "Role assigned to the users successfully" });
  } catch (error) {
    console.error("Error assigning role to users:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
