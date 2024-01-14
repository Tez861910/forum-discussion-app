import { ReadReceipts } from "../../../db.js";

export const handleReceiptGet = async (req, res) => {
  const { receiptId } = req.params;

  try {
    const result = await ReadReceipts.findOne({
      where: { ReceiptID: receiptId },
    });

    if (result) {
      console.log("Read receipt retrieved successfully");
      res.json({ readReceipt: result });
    } else {
      console.error("Read receipt not found");
      res.status(404).json({ error: "Read receipt not found" });
    }
  } catch (error) {
    console.error("Error getting read receipt:", error);
    res
      .status(500)
      .json({ error: "Error getting read receipt", details: error.message });
  }
};
