import { query } from "../../../db.js";

export const handleStatusUpdate = async (req, res) => {
  const { userId } = req.params;
  const { isOnline } = req.body;

  try {
    const sql =
      "INSERT INTO UserStatus (UserID, IsOnline, LastOnline) VALUES (?, ?, CURRENT_TIMESTAMP) " +
      "ON DUPLICATE KEY UPDATE IsOnline = VALUES(IsOnline), LastOnline = CURRENT_TIMESTAMP";
    await query(sql, [userId, isOnline]);

    console.log("User status updated successfully");
    res.json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res
      .status(500)
      .json({ error: "Error updating user status", details: error.message });
  }
};
