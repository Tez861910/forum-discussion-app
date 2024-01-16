import { sequelize } from "../../../db.js";

export const handleForumGetById = async (req, res) => {
  const { forumId } = req.params;

  try {
    const Forums = sequelize.models.Forums;

    const result = await Forums.findOne({
      where: { ForumID: forumId },
    });

    if (result) {
      console.log("Forum retrieved successfully");
      res.json(result);
    } else {
      console.error("Forum not found");
      res.status(404).json({ error: "Forum not found" });
    }
  } catch (error) {
    console.error("Error getting forum:", error);
    res
      .status(500)
      .json({ error: "Error getting forum", details: error.message });
  }
};
