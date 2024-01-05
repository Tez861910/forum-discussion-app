import { query } from "../../../db.js";

export const handleAttachmentGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM Attachments";
    const [result] = await query(sql);

    console.log("Attachments retrieved successfully");
    res.json({ attachments: result });
  } catch (error) {
    console.error("Error getting attachments:", error);
    res
      .status(500)
      .json({ error: "Error getting attachments", details: error.message });
  }
};
