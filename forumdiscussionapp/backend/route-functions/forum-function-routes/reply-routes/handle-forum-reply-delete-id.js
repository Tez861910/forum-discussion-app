import { sequelize } from "../../../db.js";

export const handleForumReplyDeleteById = async (req, res) => {
  const { forumReplyId } = req.params;
  const { userId } = req.body;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const ForumsReplies = sequelize.models.ForumsReplies;

    // Step 1: Find the ForumReply and associated CommonAttributeID
    const forumReply = await ForumsReplies.findByPk(forumReplyId);

    if (!forumReply) {
      console.error("Forum reply not found");
      return res.status(404).json({ error: "Forum reply not found" });
    }

    const commonAttributeId = forumReply.CommonAttributeID;

    // Step 2: Update CommonAttributes for soft delete
    const commonAttributesResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: commonAttributeId },
      }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("Forum reply soft deleted successfully");
      res.json({ message: "Forum reply soft deleted successfully" });
    } else {
      console.error("Forum reply soft deletion failed");
      res.status(500).json({ error: "Forum reply soft deletion failed" });
    }
  } catch (error) {
    console.error("Error soft deleting forum reply:", error);
    res.status(500).json({
      error: "Error soft deleting forum reply",
      details: error.message,
    });
  }
};
