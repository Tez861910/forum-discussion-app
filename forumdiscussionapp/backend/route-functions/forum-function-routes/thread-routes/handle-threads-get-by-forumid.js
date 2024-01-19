import { sequelize } from "../../../db.js";

export const handleThreadsGetForumId = async (req, res) => {
  const forumId = req.params.forumId;
  console.log("Received forumId:", forumId);

  try {
    const Threads = sequelize.models.Threads;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const results = await Threads.findAll({
      where: { ForumID: forumId },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
    });

    console.log("Threads data:", results);

    res.json(results);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res
      .status(500)
      .json({ error: "Thread retrieval failed", details: error.message });
  }
};
