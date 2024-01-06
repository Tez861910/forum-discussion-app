import { query } from "../../../db.js";

export const handleReadReceiptGroupGet = async (req, res) => {
  const { receiptId } = req.params;

  try {
    const sql = "SELECT * FROM ReadReceiptsGroup WHERE GReceiptID = ?";
    const [result] = await query(sql, [receiptId]);

    if (result.length > 0) {
      console.log("Read receipt for group message retrieved successfully");
      res.json({ readReceiptGroup: result[0] });
    } else {
      console.error("Read receipt for group message not found");
      res
        .status(404)
        .json({ error: "Read receipt for group message not found" });
    }
  } catch (error) {
    console.error("Error getting read receipt for group message:", error);
    res
      .status(500)
      .json({
        error: "Error getting read receipt for group message",
        details: error.message,
      });
  }
};
