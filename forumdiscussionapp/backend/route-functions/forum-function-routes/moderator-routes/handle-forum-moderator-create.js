import { sequelize } from "../../../db.js";

export const handleForumModeratorCreate = async (req, res) => {
  const { userId, forumId, promotedAt } = req.body;

  try {
    const ForumModerators = sequelize.models.ForumModerators;

    if (!userId || !forumId || !promotedAt) {
      console.log("UserID, ForumID, and PromotedAt are required");
      return res
        .status(400)
        .json({ error: "UserID, ForumID, and PromotedAt are required" });
    }

    const result = await ForumModerators.create({
      UserID: userId,
      ForumID: forumId,
      PromotedAt: promotedAt,
    });

    if (result) {
      console.log("Forum moderator created successfully");
      res.json({ message: "Forum moderator created successfully" });
    } else {
      console.error("Forum moderator creation failed");
      res.status(500).json({ error: "Forum moderator creation failed" });
    }
  } catch (error) {
    console.error("Error creating forum moderator:", error);
    res.status(500).json({
      error: "Forum moderator creation failed",
      details: error.message,
    });
  }
};
