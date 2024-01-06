import { query } from "../../../db.js";

export const handlePrivateMessageDeleteById = async (req, res) => {
  const { messageId } = req.params;

  try {
    const sql = "DELETE FROM PrivateMessages WHERE MessageID = ?";
    const [result] = await query(sql, [messageId]);

    if (result.affectedRows === 1) {
      console.log("Private message deleted successfully");
      res.json({ message: "Private message deleted successfully" });
    } else {
      console.error("Private message deletion failed");
      res.status(500).json({ error: "Private message deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting private message:", error);
    res
      .status(500)
      .json({
        error: "Error deleting private message",
        details: error.message,
      });
  }
};
