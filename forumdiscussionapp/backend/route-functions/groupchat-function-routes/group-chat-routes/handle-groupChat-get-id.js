import { GroupChat } from "../../../db.js";

export const handleGroupChatGetById = async (req, res) => {
  const { groupId } = req.params;

  try {
    const result = await GroupChat.findOne({
      where: { GroupID: groupId },
    });

    if (result) {
      console.log("Group chat retrieved successfully");
      res.json(result);
    } else {
      console.error("Group chat not found");
      res.status(404).json({ error: "Group chat not found" });
    }
  } catch (error) {
    console.error("Error getting group chat:", error);
    res
      .status(500)
      .json({ error: "Error getting group chat", details: error.message });
  }
};
