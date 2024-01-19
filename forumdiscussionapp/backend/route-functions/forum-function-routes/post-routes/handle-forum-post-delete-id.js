import { sequelize } from "../../../db.js";

export const handleForumPostDeleteById = async (req, res) => {
  const { forumPostId } = req.params;
  const { userId } = req.body; // Assuming you provide the user ID for deletion

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const ForumPosts = sequelize.models.ForumPosts;

    // Step 1: Find the ForumPost and associated CommonAttributeID
    const forumPost = await ForumPosts.findByPk(forumPostId);

    if (!forumPost) {
      console.error("Forum post not found");
      return res.status(404).json({ error: "Forum post not found" });
    }

    const commonAttributeId = forumPost.CommonAttributeID;

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
      console.log("Forum post soft deleted successfully");
      res.json({ message: "Forum post soft deleted successfully" });
    } else {
      console.error("Forum post soft deletion failed");
      res.status(500).json({ error: "Forum post soft deletion failed" });
    }
  } catch (error) {
    console.error("Error soft deleting forum post:", error);
    res
      .status(500)
      .json({
        error: "Error soft deleting forum post",
        details: error.message,
      });
  }
};
