import { query } from "../../../db.js";
import { hashPassword } from "../../../authvalid.js";

export const handleUsersUpdateUsers = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const createdByUserID = req.body.createdByUserID;

  try {
    if (!userData.UserName && !userData.UserEmail && !userData.UserPassword) {
      console.log("No valid fields provided for update");
      return res
        .status(400)
        .json({ error: "No valid fields provided for update" });
    }

    // Create an SQL query dynamically based on the provided user data
    const updateFields = [];
    const values = [];

    if (userData.UserName) {
      updateFields.push("UserName = ?");
      values.push(userData.UserName);
    }

    if (userData.UserEmail) {
      updateFields.push("UserEmail = ?");
      values.push(userData.UserEmail);
    }

    // Hash the password if provided
    if (userData.UserPassword) {
      const hashedPassword = await hashPassword(userData.UserPassword);
      updateFields.push("UserPassword = ?");
      values.push(hashedPassword);
    }

    // Include CommonAttributeID for IsDeleted and updated fields
    updateFields.push("CommonAttributeID = ?");
    values.push(userData.CommonAttributeID); // Make sure to adjust based on your actual request structure

    // Add fields for updated by and updated at
    updateFields.push("UpdatedByUserID = ?");
    values.push(createdByUserID);
    updateFields.push("UpdatedAt = CURRENT_TIMESTAMP");

    // Check IsDeleted in common attributes table
    const isDeletedSql =
      "SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = ?";
    const [isDeletedResult] = await query(isDeletedSql, [
      userData.CommonAttributeID,
    ]);

    if (isDeletedResult.length === 1 && isDeletedResult[0].IsDeleted) {
      return res.status(400).json({ error: "User is marked as deleted" });
    }

    values.push(id);

    if (updateFields.length === 0) {
      console.log("No valid fields provided for update");
      return res
        .status(400)
        .json({ error: "No valid fields provided for update" });
    }

    const sql = `UPDATE Users SET ${updateFields.join(
      ", "
    )} WHERE UserID = ? AND CommonAttributeID = ?`;

    const [result] = await query(sql, [...values, userData.CommonAttributeID]);

    if (result.affectedRows === 1) {
      console.log("User updated successfully");
      res.json({ message: "User updated successfully" });
    } else {
      console.error("User update failed");
      res.status(500).json({ error: "User update failed" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "User update failed", details: error.message });
  }
};
