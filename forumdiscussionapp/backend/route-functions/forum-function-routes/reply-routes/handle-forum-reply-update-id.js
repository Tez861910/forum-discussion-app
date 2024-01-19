import { sequelize } from "../../../db.js";

export const handleForumReplyUpdateById = async (req, res) => {
  const { forumReplyId } = req.params;
  const { replyContent, userId } = req.body;

  try {
    if (!replyContent) {
      console.log("ReplyContent is required for update");
      return res
        .status(400)
        .json({ error: "ReplyContent is required for update" });
    }

    const ForumReplies = sequelize.models.ForumReplies;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Step 1: Update ForumReplies
    const forumReplyResult = await ForumReplies.update(
      { ReplyContent: replyContent },
      { where: { ForumReplyID: forumReplyId } }
    );

    if (forumReplyResult[0] !== 1) {
      console.error("Forum reply update failed");
      return res.status(500).json({ error: "Forum reply update failed" });
    }

    // Step 2: Update CommonAttributes for updated by user
    const forumReply = await ForumReplies.findByPk(forumReplyId);
    const commonAttributeId = forumReply.CommonAttributeID;

    const commonAttributesResult = await CommonAttributes.update(
      { UpdatedByUserID: userId },
      { where: { AttributeID: commonAttributeId } }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("Forum reply and CommonAttributes updated successfully");
      res.json({
        message: "Forum reply and CommonAttributes updated successfully",
      });
    } else {
      console.error("CommonAttributes update failed");
      res.status(500).json({ error: "CommonAttributes update failed" });
    }
  } catch (error) {
    console.error("Error updating forum reply:", error);
    res
      .status(500)
      .json({ error: "Forum reply update failed", details: error.message });
  }
};
