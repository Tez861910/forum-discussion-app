import { sequelize } from "../../../db.js";

export const handleReceiptCreate = async (req, res) => {
  const { messageId, userId } = req.body;

  try {
    // Dynamically access the ReadReceipts model using sequelize.models
    const ReadReceipts = sequelize.models.ReadReceipts;

    const result = await ReadReceipts.create({
      MessageID: messageId,
      UserID: userId,
    });

    if (result) {
      console.log("Read receipt created successfully");
      res.json({ message: "Read receipt created successfully" });
    } else {
      console.error("Read receipt creation failed");
      res.status(500).json({ error: "Read receipt creation failed" });
    }
  } catch (error) {
    console.error("Error creating read receipt:", error);
    res
      .status(500)
      .json({ error: "Read receipt creation failed", details: error.message });
  }
};
