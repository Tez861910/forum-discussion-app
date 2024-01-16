import { sequelize } from "../../../db.js";

export const handleGroupMembersGetByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Dynamically access the GroupMembers model using sequelize.models
    const GroupMembers = sequelize.models.GroupMembers;

    const result = await GroupMembers.findAll({
      where: { UserID: userId },
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
