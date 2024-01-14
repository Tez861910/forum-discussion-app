import { GroupManager } from "../../../db.js";

export const handleManagerGet = async (req, res) => {
  const { managerId } = req.params;

  try {
    const result = await GroupManager.findOne({
      where: { ManagerID: managerId },
    });

    if (result) {
      console.log("Group manager retrieved successfully");
      res.json({ groupManager: result });
    } else {
      console.error("Group manager not found");
      res.status(404).json({ error: "Group manager not found" });
    }
  } catch (error) {
    console.error("Error getting group manager:", error);
    res
      .status(500)
      .json({ error: "Error getting group manager", details: error.message });
  }
};
