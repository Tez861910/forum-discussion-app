import { UserRoles, CommonAttributes } from "../../../db.js";

export const handleRIDEnrollmentsUID = async (req, res) => {
  const { roleId, userId } = req.params;

  try {
    // Fetch the user role for the given user ID and role ID
    const userRole = await UserRoles.findOne({
      where: { RoleID: roleId, UserID: userId },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    if (!userRole) {
      return res
        .status(404)
        .json({ error: "Role assignment not found or already removed" });
    }

    // Soft-delete the role assignment
    await CommonAttributes.update(
      { IsDeleted: true },
      { where: { AttributeID: userRole.CommonAttributeID } }
    );

    console.log(`Role ${roleId} removed from user ${userId}.`);
    res.json({ message: "Role removed from the user successfully" });
  } catch (error) {
    console.error("Error removing role from user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
