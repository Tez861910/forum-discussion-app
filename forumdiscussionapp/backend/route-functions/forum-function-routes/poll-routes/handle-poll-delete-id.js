import { query } from "../../../db.js";

export const handlePollDeleteById = async (req, res) => {
  const { pollId } = req.params;

  try {
    const sql = "DELETE FROM Polls WHERE PollID = ?";
    const [result] = await query(sql, [pollId]);

    if (result.affectedRows === 1) {
      console.log("Poll deleted successfully");
      res.json({ message: "Poll deleted successfully" });
    } else {
      console.error("Poll deletion failed");
      res.status(500).json({ error: "Poll deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting poll:", error);
    res
      .status(500)
      .json({ error: "Error deleting poll", details: error.message });
  }
};
