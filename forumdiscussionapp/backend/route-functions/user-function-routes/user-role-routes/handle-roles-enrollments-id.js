import { query } from "../../../db.js";

export const handleRolesEnrollmentsId = async (req, res) => {
  const roleId = req.params.roleId;

  try {
    if (!query) {
      throw new Error(
        "Database connection not established or query function not defined."
      );
    }

    const sql = `
      SELECT
        users.UserID,
        users.UserName
      FROM
        users
      JOIN
        userroles ON users.UserID = userroles.UserID
        JOIN CommonAttributes caUsers ON users.CommonAttributeID = caUsers.AttributeID
        JOIN CommonAttributes caUserRoles ON userroles.CommonAttributeID = caUserRoles.AttributeID
      WHERE
        userroles.RoleID = ? AND caUsers.IsDeleted = FALSE AND caUserRoles.IsDeleted = FALSE;
    `;

    const rows = await query(sql, [parseInt(roleId, 10)]);

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No users found for the specified role" });
    }

    const enrollmentsResult = {};

    rows.forEach(({ UserID, UserName }) => {
      if (!enrollmentsResult[UserID]) {
        enrollmentsResult[UserID] = [];
      }
      enrollmentsResult[UserID].push({ UserID, UserName });
    });

    res.json({ enrollments: enrollmentsResult });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
