import { GroupMessages } from "../../../db.js";

export const handleGroupMessagesDelete = async (req, res) => {
  const { messageId } = req.params;

  try {
    const result = await GroupMessages.destroy({
      where: { MessageID: messageId },
    });

    if (result === 1) {
      console.log("Group message deleted successfully");
      res.json({ message: "Group message deleted successfully" });
    } else {
      console.error("Group message deletion failed");
      res.status(500).json({ error: "Group message deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting group message:", error);
    res
      .status(500)
      .json({ error: "Group message deletion failed", details: error.message });
  }
};
