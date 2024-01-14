import { GroupMessages } from "../../../db.js";

export const handleGroupMessagesGetByGroupId = async (req, res) => {
  const { groupId } = req.params;

  try {
    const result = await GroupMessages.findAll({
      where: { GroupID: groupId },
    });

    console.log("Group messages retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting group messages:", error);
    res
      .status(500)
      .json({ error: "Error getting group messages", details: error.message });
  }
};
