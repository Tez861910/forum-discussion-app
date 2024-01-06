import { query } from "../../../db.js";

export const handleManagerUpdate = async (req, res) => {
  const { managerId } = req.params;
  const { groupId, managerUserId } = req.body;

  try {
    const sql =
      "UPDATE GroupManager SET GroupID = ?, ManagerUserID = ? WHERE ManagerID = ?";
    const [result] = await query(sql, [groupId, managerUserId, managerId]);

    if (result.affectedRows === 1) {
      console.log("Group manager updated successfully");
      res.json({ message: "Group manager updated successfully" });
    } else {
      console.error("Group manager update failed");
      res.status(500).json({ error: "Group manager update failed" });
    }
  } catch (error) {
    console.error("Error updating group manager:", error);
    res
      .status(500)
      .json({ error: "Error updating group manager", details: error.message });
  }
};
