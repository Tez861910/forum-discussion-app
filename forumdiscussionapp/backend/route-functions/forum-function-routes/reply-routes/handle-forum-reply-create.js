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

    const CommonAttributes = sequelize.models.CommonAttributes;
    const ForumReplies = sequelize.models.ForumReplies;

    // Step 1: Create a CommonAttributes entry
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    if (!commonAttributesResult) {
      console.error("CommonAttributes creation failed");
      return res
        .status(500)
        .json({ error: "CommonAttributes creation failed" });
    }

    // Step 2: Create a ForumReplies entry with CommonAttributeID
    const result = await ForumReplies.create({
      ForumPostID: forumPostId,
      UserID: userId,
      ReplyContent: replyContent,
      CommonAttributeID: commonAttributesResult.AttributeID,
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
