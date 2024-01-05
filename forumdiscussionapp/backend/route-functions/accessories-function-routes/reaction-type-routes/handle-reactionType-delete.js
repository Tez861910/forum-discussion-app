import { query } from "../../../db.js";

export const handleReactionTypeDelete = async (req, res) => {
  const { reactionTypeId } = req.params;

  try {
    const sql = "DELETE FROM ReactionType WHERE ReactionTypeID = ?";
    const [result] = await query(sql, [reactionTypeId]);

    if (result.affectedRows === 1) {
      console.log("ReactionType deleted successfully");
      res.json({ message: "ReactionType deleted successfully" });
    } else {
      console.error("ReactionType deletion failed");
      res.status(500).json({ error: "ReactionType deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting reaction type:", error);
    res
      .status(500)
      .json({ error: "ReactionType deletion failed", details: error.message });
  }
};
