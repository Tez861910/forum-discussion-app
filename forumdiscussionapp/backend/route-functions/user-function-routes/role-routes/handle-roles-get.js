import { query } from "../../../db.js";

export const handleRolesGet = async (req, res) => {
  try {
    const sql =
      "SELECT r.*, ca.IsDeleted as CommonAttributeIsDeleted FROM Roles r INNER JOIN CommonAttributes ca ON r.CommonAttributeID = ca.AttributeID WHERE ca.IsDeleted = false";
    const results = await query(sql);

    if (!Array.isArray(results) || results.length === 0) {
      console.error("No roles found in the database");
      return res.status(404).json({ error: "No roles found" });
    }

    const rolesData = results.map((row) => ({
      roleId: row.RoleID,
      roleName: row.RoleName,
      roleDescription: row.RoleDescription,
      commonAttributeId: row.CommonAttributeID,
      commonAttributeIsDeleted: row.CommonAttributeIsDeleted,
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
