import { query } from "../../../db.js";

export const handleRIDEnrollmentsUID = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const userId = req.params.userId;

    // Check if the role assignment exists and is not deleted
    const checkRoleSql =
      "SELECT * FROM UserRoles ur INNER JOIN CommonAttributes ca ON ur.CommonAttributeID = ca.AttributeID WHERE ur.RoleID = ? AND ur.UserID = ? AND ca.IsDeleted = FALSE";
    const [checkRoleResult] = await query(checkRoleSql, [roleId, userId]);

    if (!checkRoleResult || checkRoleResult.length === 0) {
      return res
        .status(404)
        .json({ error: "Role assignment not found or already removed" });
    }

    // Soft-delete the role assignment
    const updateSql =
      "UPDATE CommonAttributes SET IsDeleted = TRUE WHERE AttributeID = ?";
    const [updateResult] = await query(updateSql, [
      checkRoleResult[0].CommonAttributeID,
    ]);

    if (updateResult.affectedRows === 0) {
      console.error("Error removing role from user");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(`Role ${roleId} removed from user ${userId}.`);

    res.json({ message: "Role removed from the user successfully" });
  } catch (error) {
    console.error("Error removing role from user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
