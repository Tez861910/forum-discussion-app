import { sequelize } from "../../../db.js";

export const handleForumDeleteById = async (req, res) => {
  const { forumId } = req.params;

  try {
    const Forums = sequelize.models.Forums;

    const result = await Forums.destroy({
      where: { ForumID: forumId },
    });

    if (result === 1) {
      console.log("Forum deleted successfully");
      res.json({ message: "Forum deleted successfully" });
    } else {
      console.error("Forum deletion failed");
      res.status(500).json({ error: "Forum deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting forum:", error);
    res
      .status(500)
      .json({ error: "Error deleting forum", details: error.message });
  }
};
