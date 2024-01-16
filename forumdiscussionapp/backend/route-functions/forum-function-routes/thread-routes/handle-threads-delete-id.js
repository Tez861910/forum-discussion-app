import { sequelize } from "../../../db.js";

export const handleThreadsDeleteId = async (req, res) => {
  const { threadId } = req.params;

  try {
    const Threads = sequelize.models.Threads;

    const result = await Threads.destroy({ where: { ThreadID: threadId } });

    if (result === 1) {
      console.log("Thread deleted successfully");
      res.json({ message: "Thread deleted successfully" });
    } else {
      console.error("Thread deletion failed");
      res.status(500).json({ error: "Thread deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting thread:", error);
    res
      .status(500)
      .json({ error: "Thread deletion failed", details: error.message });
  }
};
