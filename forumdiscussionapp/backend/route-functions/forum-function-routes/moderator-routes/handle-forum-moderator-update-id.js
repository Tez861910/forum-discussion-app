import { sequelize } from "../../../db.js";

export const handleForumModeratorUpdateById = async (req, res) => {
  const { forumModeratorId } = req.params;
  const { userId, forumId, promotedAt } = req.body;

  try {
    if (!userId || !forumId || !promotedAt) {
      console.log("UserID, ForumID, and PromotedAt are required for update");
      return res.status(400).json({
        error: "UserID, ForumID, and PromotedAt are required for update",
      });
    }

    const ForumModerators = sequelize.models.ForumModerators;

    const result = await ForumModerators.update(
      { UserID: userId, ForumID: forumId, PromotedAt: promotedAt },
      { where: { ForumModeratorID: forumModeratorId } }
    );

    if (result[0] === 1) {
      console.log("Forum moderator updated successfully");
      res.json({ message: "Forum moderator updated successfully" });
    } else {
      console.error("Forum moderator update failed");
      res.status(500).json({ error: "Forum moderator update failed" });
    }
  } catch (error) {
    console.error("Error updating forum moderator:", error);
    res
      .status(500)
      .json({ error: "Forum moderator update failed", details: error.message });
  }
};
