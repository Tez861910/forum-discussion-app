import { sequelize } from "../../../db.js";

export const handleThreadsGetByThreadId = async (req, res) => {
  const { threadId } = req.params;

  try {
    const Threads = sequelize.models.Threads;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const thread = await Threads.findOne({
      where: { ThreadID: threadId },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
    });

    console.log("Thread by ID data:", thread);

    if (thread) {
      res.json({ thread });
    } else {
      res.status(404).json({ error: "Thread not found" });
    }
  } catch (error) {
    console.error("Error fetching thread by ID:", error);
    res
      .status(500)
      .json({ error: "Thread retrieval failed", details: error.message });
  }
};
