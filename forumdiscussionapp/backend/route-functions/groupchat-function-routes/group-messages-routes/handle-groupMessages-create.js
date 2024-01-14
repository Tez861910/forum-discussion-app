import { GroupMessages } from "../../../db.js";

export const handleGroupMessagesCreate = async (req, res) => {
  const { groupId, senderId, messageContent } = req.body;

  try {
    if (!groupId || !senderId || !messageContent) {
      console.log("GroupID, SenderID, and MessageContent are required");
      return res.status(400).json({
        error: "GroupID, SenderID, and MessageContent are required",
      });
    }

    const result = await GroupMessages.create({
      GroupID: groupId,
      SenderID: senderId,
      MessageContent: messageContent,
    });

    if (result) {
      console.log("Group message sent successfully");
      res.json({ message: "Group message sent successfully" });
    } else {
      console.error("Group message sending failed");
      res.status(500).json({ error: "Group message sending failed" });
    }
  } catch (error) {
    console.error("Error sending group message:", error);
    res
      .status(500)
      .json({ error: "Group message sending failed", details: error.message });
  }
};
