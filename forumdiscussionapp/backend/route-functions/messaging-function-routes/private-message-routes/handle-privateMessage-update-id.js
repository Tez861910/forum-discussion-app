import { PrivateMessages } from "../../../db.js";

export const handlePrivateMessageUpdateById = async (req, res) => {
  const { messageId } = req.params;
  const { senderId, receiverId, messageContent } = req.body;

  try {
    const result = await PrivateMessages.update(
      {
        SenderID: senderId,
        ReceiverID: receiverId,
        MessageContent: messageContent,
      },
      { where: { MessageID: messageId } }
    );

    if (result[0] === 1) {
      console.log("Private message updated successfully");
      res.json({ message: "Private message updated successfully" });
    } else {
      console.error("Private message update failed");
      res.status(500).json({ error: "Private message update failed" });
    }
  } catch (error) {
    console.error("Error updating private message:", error);
    res
      .status(500)
      .json({ error: "Private message update failed", details: error.message });
  }
};
