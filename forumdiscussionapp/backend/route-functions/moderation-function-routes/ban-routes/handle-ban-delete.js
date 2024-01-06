import { query } from "../../../db.js";

export const handleBanDelete = async (req, res) => {
  const { banId } = req.params;

  try {
    const sql = "DELETE FROM Bans WHERE BanID = ?";
    const [result] = await query(sql, [banId]);

    if (result.affectedRows === 1) {
      console.log("Ban deleted successfully");
      res.json({ message: "Ban deleted successfully" });
    } else {
      console.error("Ban deletion failed");
      res.status(500).json({ error: "Ban deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting ban:", error);
    res
      .status(500)
      .json({ error: "Ban deletion failed", details: error.message });
  }
};
