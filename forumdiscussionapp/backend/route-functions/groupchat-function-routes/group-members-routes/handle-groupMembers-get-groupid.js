import { GroupMembers } from "../../../db.js";

export const handleGroupMembersGetByGroupId = async (req, res) => {
  const { groupId } = req.params;

  try {
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
