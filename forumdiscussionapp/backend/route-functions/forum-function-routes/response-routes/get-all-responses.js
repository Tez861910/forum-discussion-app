import { query } from "../../../db.js";

export const getAllResponses = async (req, res) => {
  const { commentId } = req.params;

  try {
    const result = await query("SELECT * FROM responses WHERE CommentID = ?", [
      commentId,
    ]);
    let responses = result;

    // Ensure responses is always an array
    if (!Array.isArray(responses)) {
      responses = [responses];
    }

    res.json({ responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
