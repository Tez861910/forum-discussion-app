import { query } from "../../../db.js";

export const createResponse = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    await query(
      "INSERT INTO responses (ResponseContent, UserID, CommentID) VALUES (?, ?, ?)",
      [content, userId, commentId]
    );

    res.json({ message: "Response added successfully" });
  } catch (error) {
    console.error("Error adding response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
