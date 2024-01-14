import { ReadReceiptsGroup } from "../../../db.js";

export const handleReadReceiptGroupGet = async (req, res) => {
  const { receiptId } = req.params;

  try {
    const result = await ReadReceiptsGroup.findOne({
      where: { GReceiptID: receiptId },
    });

    if (result) {
      console.log("Read receipt for group message retrieved successfully");
      res.json({ readReceiptGroup: result });
    } else {
      console.error("Read receipt for group message not found");
      res
        .status(404)
        .json({ error: "Read receipt for group message not found" });
    }
  } catch (error) {
    console.error("Error getting read receipt for group message:", error);
    res.status(500).json({
      error: "Error getting read receipt for group message",
      details: error.message,
    });
  }
};
