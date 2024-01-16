import { sequelize } from "../../../db.js";

export const handleManagerUpdate = async (req, res) => {
  const { managerId } = req.params;
  const { groupId, managerUserId } = req.body;

  try {
    // Dynamically access the GroupManagers model using sequelize.models
    const GroupManagers = sequelize.models.GroupManagers;

    const result = await GroupManagers.update(
      {
        GroupID: groupId,
        ManagerUserID: managerUserId,
      },
      { where: { ManagerID: managerId } }
    );

    if (result[0] === 1) {
      console.log("Group manager updated successfully");
      res.json({ message: "Group manager updated successfully" });
    } else {
      console.error("Group manager update failed");
      res.status(500).json({ error: "Group manager update failed" });
    }
  } catch (error) {
    console.error("Error updating group manager:", error);
    res
      .status(500)
      .json({ error: "Group manager update failed", details: error.message });
  }
};
