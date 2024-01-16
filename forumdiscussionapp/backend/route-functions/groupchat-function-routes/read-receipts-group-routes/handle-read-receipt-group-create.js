import { sequelize } from "../../../db.js";

export const handleReadReceiptGroupCreate = async (req, res) => {
  const { groupMessageId, userId } = req.body;

  try {
    // Dynamically access the ReadReceiptsGroups model using sequelize.models
    const ReadReceiptsGroups = sequelize.models.ReadReceiptsGroups;

    const result = await ReadReceiptsGroups.create({
      GroupMessageID: groupMessageId,
      UserID: userId,
    });

    if (result) {
      console.log("Read receipt for group message created successfully");
      res.json({
        message: "Read receipt for group message created successfully",
      });
    } else {
      console.error("Read receipt creation for group message failed");
      res
        .status(500)
        .json({ error: "Read receipt creation for group message failed" });
    }
  } catch (error) {
    console.error("Error creating read receipt for group message:", error);
    res.status(500).json({
      error: "Read receipt creation for group message failed",
      details: error.message,
    });
  }
};
