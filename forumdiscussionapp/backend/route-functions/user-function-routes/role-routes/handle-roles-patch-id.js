import { query } from "../../../db.js";

export const handleRolesPatchId = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the role with the provided ID exists
    const checkRoleSql =
      "SELECT * FROM Roles r INNER JOIN CommonAttributes ca ON r.CommonAttributeID = ca.AttributeID WHERE r.RoleID = ? AND ca.IsDeleted = false";
    const [checkRoleResult] = await query(checkRoleSql, [id]);

    if (!checkRoleResult || checkRoleResult.length !== 1) {
      console.error("Role not found");
      return res.status(404).json({ error: "Role not found" });
    }

    // Soft-delete the role
    const updateSql =
      "UPDATE CommonAttributes SET IsDeleted = TRUE WHERE AttributeID = ?";
    const [result] = await query(updateSql, [
      checkRoleResult[0].CommonAttributeID,
    ]);

    if (result.affectedRows === 1) {
      console.log("Role soft-deleted successfully");
      res.json({ message: "Role soft-deleted successfully" });
    } else {
      console.error("Role soft-deletion failed");
      res.status(500).json({ error: "Role soft-deletion failed" });
    }
  } catch (error) {
    console.error("Error soft-deleting role:", error);
    res
      .status(500)
      .json({ error: "Role soft-deletion failed", details: error.message });
  }
};
