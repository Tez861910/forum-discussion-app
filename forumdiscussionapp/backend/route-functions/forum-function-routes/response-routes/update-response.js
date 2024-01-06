import { query } from "../../../db.js";

export const updateResponse = async (req, res) => {
  const { responseId } = req.params;
  const { content } = req.body;

  try {
    await query(
      "UPDATE responses SET ResponseContent = ? WHERE ResponseID = ?",
      [content, responseId]
    );

    res.json({ message: "Response updated successfully" });
  } catch (error) {
    console.error("Error updating response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
