import { sequelize } from "../../../db.js";

export const handleManagerDelete = async (req, res) => {
  const { managerId } = req.params;

  try {
    // Dynamically access the GroupManagers model using sequelize.models
    const GroupManagers = sequelize.models.GroupManagers;

    const result = await GroupManagers.destroy({
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
