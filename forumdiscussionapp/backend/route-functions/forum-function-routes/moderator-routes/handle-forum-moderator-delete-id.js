import { sequelize } from "../../../db.js";

export const handleForumModeratorDeleteById = async (req, res) => {
  const { forumModeratorId } = req.params;

  try {
    const ForumModerators = sequelize.models.ForumModerators;

    const result = await ForumModerators.destroy({
      where: { ForumModeratorID: forumModeratorId },
    });

    if (result === 1) {
      console.log("Forum moderator deleted successfully");
      res.json({ message: "Forum moderator deleted successfully" });
    } else {
      console.error("Forum moderator deletion failed");
      res.status(500).json({ error: "Forum moderator deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting forum moderator:", error);
    res.status(500).json({
      error: "Error deleting forum moderator",
      details: error.message,
    });
  }
};
