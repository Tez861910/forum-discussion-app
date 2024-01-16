import { sequelize } from "../../../db.js";

export const handlePrivateMessageCreate = async (req, res) => {
  const { senderId, receiverId, messageContent } = req.body;

  try {
    // Dynamically access the PrivateMessages model using sequelize.models
    const PrivateMessages = sequelize.models.PrivateMessages;

    if (!senderId || !receiverId || !messageContent) {
      console.log("SenderID, ReceiverID, and MessageContent are required");
      return res.status(400).json({
        error: "SenderID, ReceiverID, and MessageContent are required",
      });
    }

    const result = await PrivateMessages.create({
      SenderID: senderId,
      ReceiverID: receiverId,
      MessageContent: messageContent,
    });

    if (result) {
      console.log("Private message created successfully");
      res.json({ message: "Private message created successfully" });
    } else {
      console.error("Private message creation failed");
      res.status(500).json({ error: "Private message creation failed" });
    }
  } catch (error) {
    console.error("Error creating private message:", error);
    res.status(500).json({
      error: "Private message creation failed",
      details: error.message,
    });
  }
};
