import { sequelize } from "../../../db.js";

export const handleGroupMembersDelete = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    // Dynamically access the GroupMembers model using sequelize.models
    const GroupMembers = sequelize.models.GroupMembers;

    const result = await GroupMembers.destroy({
      where: { GroupID: groupId, UserID: userId },
    });

    if (result === 1) {
      console.log("Group member deleted successfully");
      res.json({ message: "Group member deleted successfully" });
    } else {
      console.error("Group member deletion failed");
      res.status(500).json({ error: "Group member deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting group member:", error);
    res
      .status(500)
      .json({ error: "Group member deletion failed", details: error.message });
  }
};
