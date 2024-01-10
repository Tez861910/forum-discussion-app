import { query } from "../../../db.js";

export const handleUsersDeleteId = async (req, res) => {
  const { id } = req.params;

  try {
    // Update the user's IsDeleted status
    const deleteUserSql =
      "UPDATE users SET IsDeleted = TRUE WHERE UserID = ? AND CommonAttributeID IN (SELECT AttributeID FROM CommonAttributes WHERE IsDeleted = FALSE)";
    const [deleteUserResult] = await query(deleteUserSql, [id]);

    if (deleteUserResult.affectedRows === 1) {
      // Soft delete user-related records in other tables
      const deleteUserCoursesSql =
        "UPDATE usercourses SET IsDeleted = TRUE WHERE UserID = ? AND CommonAttributeID IN (SELECT AttributeID FROM CommonAttributes WHERE IsDeleted = FALSE)";
      await query(deleteUserCoursesSql, [id]);

      const deleteUserRolesSql =
        "UPDATE userroles SET IsDeleted = TRUE WHERE UserID = ? AND CommonAttributeID IN (SELECT AttributeID FROM CommonAttributes WHERE IsDeleted = FALSE)";
      await query(deleteUserRolesSql, [id]);

      console.log("User and associated records marked as deleted successfully");
      res.json({
        message: "User and associated records marked as deleted successfully",
      });
    } else {
      console.error("User deletion failed");
      res.status(500).json({ error: "User deletion failed" });
    }
  } catch (error) {
    console.error(
      "Error marking user and associated records as deleted:",
      error
    );
    res
      .status(500)
      .json({ error: "User deletion failed", details: error.message });
  }
};