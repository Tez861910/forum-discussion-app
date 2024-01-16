import { sequelize } from "../../../db.js";

export const handleGroupChatDeleteById = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Dynamically access the GroupChats model using sequelize.models
    const GroupChats = sequelize.models.GroupChats;

    const result = await GroupChats.destroy({
      where: { GroupID: groupId },
    });

    if (result === 1) {
      console.log("Group chat deleted successfully");
      res.json({ message: "Group chat deleted successfully" });
    } else {
      console.error("Group chat deletion failed");
      res.status(500).json({ error: "Group chat deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting group chat:", error);
    res
      .status(500)
      .json({ error: "Group chat deletion failed", details: error.message });
  }
};
