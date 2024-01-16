import { sequelize } from "../../../db.js";

export const handleForumReplyCreate = async (req, res) => {
  const { forumPostId } = req.params;
  const { userId, replyContent } = req.body;

  try {
    if (!userId || !replyContent) {
      console.log("UserID and ReplyContent are required");
      return res
        .status(400)
        .json({ error: "UserID and ReplyContent are required" });
    }

    const ForumReplies = sequelize.models.ForumReplies;

    const result = await ForumReplies.create({
      ForumPostID: forumPostId,
      UserID: userId,
      ReplyContent: replyContent,
    });

    if (result) {
      console.log("Forum reply created successfully");
      res.json({ message: "Forum reply created successfully" });
    } else {
      console.error("Forum reply creation failed");
      res.status(500).json({ error: "Forum reply creation failed" });
    }
  } catch (error) {
    console.error("Error creating forum reply:", error);
    res
      .status(500)
      .json({ error: "Forum reply creation failed", details: error.message });
  }
};
