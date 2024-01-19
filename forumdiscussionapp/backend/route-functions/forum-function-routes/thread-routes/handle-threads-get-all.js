import { sequelize } from "../../../db.js";

export const handleThreadsGetAll = async (req, res) => {
  try {
    const Threads = sequelize.models.Threads;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const results = await Threads.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
    });

    console.log("All Threads data:", results);

    if (results && results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ error: "No threads found" });
    }
  } catch (error) {
    console.error("Error fetching threads:", error);
    res
      .status(500)
      .json({ error: "Thread retrieval failed", details: error.message });
  }
};
