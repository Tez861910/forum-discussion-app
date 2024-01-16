import { sequelize } from "../../../db.js";

export const handleGroupMembersGetByGroupId = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Dynamically access the GroupMembers model using sequelize.models
    const GroupMembers = sequelize.models.GroupMembers;

    const result = await GroupMembers.findAll({
      where: { GroupID: groupId },
    });

    console.log("Group members retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting group members:", error);
    res
      .status(500)
      .json({ error: "Error getting group members", details: error.message });
  }
};
