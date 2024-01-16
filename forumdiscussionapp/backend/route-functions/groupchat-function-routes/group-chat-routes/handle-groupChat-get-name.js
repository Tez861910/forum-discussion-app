import { sequelize } from "../../../db.js";

export const handleGroupChatGetByName = async (req, res) => {
  const { groupName } = req.params;

  try {
    // Dynamically access the GroupChats model using sequelize.models
    const GroupChats = sequelize.models.GroupChats;

    const result = await GroupChats.findOne({
      where: { GroupName: groupName },
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
