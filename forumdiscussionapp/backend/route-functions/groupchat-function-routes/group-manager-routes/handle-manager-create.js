import { GroupManager } from "../../../db.js";

export const handleManagerCreate = async (req, res) => {
  const { groupId, managerUserId } = req.body;

  try {
    const result = await GroupManager.create({
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
