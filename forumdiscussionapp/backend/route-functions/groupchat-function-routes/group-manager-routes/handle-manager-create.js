import { sequelize } from "../../../db.js";

export const handleManagerCreate = async (req, res) => {
  const { groupId, managerUserId } = req.body;

  try {
    // Dynamically access the GroupManagers model using sequelize.models
    const GroupManagers = sequelize.models.GroupManagers;

    const result = await GroupManagers.create({
      GroupID: groupId,
      ManagerUserID: managerUserId,
    });

    if (result) {
      console.log("Group manager created successfully");
      res.json({ message: "Group manager created successfully" });
    } else {
      console.error("Group manager creation failed");
      res.status(500).json({ error: "Group manager creation failed" });
    }
  } catch (error) {
    console.error("Error creating group manager:", error);
    res
      .status(500)
      .json({ error: "Group manager creation failed", details: error.message });
  }
};
