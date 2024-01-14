import { GroupManager } from "../../../db.js";

export const handleManagerDelete = async (req, res) => {
  const { managerId } = req.params;

  try {
    const result = await GroupManager.destroy({
      where: { ManagerID: managerId },
    });

    if (result === 1) {
      console.log("Group manager deleted successfully");
      res.json({ message: "Group manager deleted successfully" });
    } else {
      console.error("Group manager deletion failed");
      res.status(500).json({ error: "Group manager deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting group manager:", error);
    res
      .status(500)
      .json({ error: "Group manager deletion failed", details: error.message });
  }
};
