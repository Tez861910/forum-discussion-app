import { sequelize } from "../../../db.js";

export const handleForumPostUpdateById = async (req, res) => {
  const { forumPostId } = req.params;
  const { postContent, userId } = req.body;

  try {
    if (!postContent) {
      console.log("PostContent is required for update");
      return res
        .status(400)
        .json({ error: "PostContent is required for update" });
    }

    const ForumsPosts = sequelize.models.ForumsPosts;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Step 1: Update ForumPosts
    const forumPostResult = await ForumsPosts.update(
      { PostContent: postContent },
      { where: { ForumPostID: forumPostId } }
    );

    if (forumPostResult[0] !== 1) {
      console.error("Forum post update failed");
      return res.status(500).json({ error: "Forum post update failed" });
    }

    // Step 2: Update CommonAttributes for updated by user
    const forumPost = await ForumsPosts.findByPk(forumPostId);
    const commonAttributeId = forumPost.CommonAttributeID;

    const commonAttributesResult = await CommonAttributes.update(
      { UpdatedByUserID: userId },
      { where: { AttributeID: commonAttributeId } }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("Forum post and CommonAttributes updated successfully");
      res.json({
        message: "Forum post and CommonAttributes updated successfully",
      });
    } else {
      console.error("CommonAttributes update failed");
      res.status(500).json({ error: "CommonAttributes update failed" });
    }
  } catch (error) {
    console.error("Error updating forum post:", error);
    res
      .status(500)
      .json({ error: "Forum post update failed", details: error.message });
  }
};
