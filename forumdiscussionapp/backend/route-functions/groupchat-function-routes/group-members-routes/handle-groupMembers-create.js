import { GroupMembers } from "../../../db.js";

export const handleGroupMembersCreate = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    if (!groupId || !userId) {
      console.log("GroupID and UserID are required");
      return res.status(400).json({
        error: "GroupID and UserID are required",
      });
    }

    const result = await GroupMembers.create({
      GroupID: groupId,
      UserID: userId,
    });

    if (result) {
      console.log("Group member added successfully");
      res.json({ message: "Group member added successfully" });
    } else {
      console.error("Group member addition failed");
      res.status(500).json({ error: "Group member addition failed" });
    }
  } catch (error) {
    console.error("Error adding group member:", error);
    res
      .status(500)
      .json({ error: "Group member addition failed", details: error.message });
  }
};
