import { sequelize } from "../../../db.js";

export const handleForumPostCreate = async (req, res) => {
  const { forumId } = req.params;
  const { userId, postContent } = req.body;

  try {
    if (!userId || !postContent) {
      console.log("UserID and PostContent are required");
      return res
        .status(400)
        .json({ error: "UserID and PostContent are required" });
    }

    const CommonAttributes = sequelize.models.CommonAttributes;
    const ForumsPosts = sequelize.models.ForumsPosts;

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

    // Step 2: Create a ForumPost entry with CommonAttributeID
    const result = await ForumsPosts.create({
      ForumID: forumId,
      UserID: userId,
      PostContent: postContent,
      CommonAttributeID: commonAttributesResult.AttributeID,
    });

    if (result) {
      console.log("Forum post created successfully");
      res.json({ message: "Forum post created successfully" });
    } else {
      console.error("Forum post creation failed");
      res.status(500).json({ error: "Forum post creation failed" });
    }
  } catch (error) {
    console.error("Error creating forum post:", error);
    res
      .status(500)
      .json({ error: "Forum post creation failed", details: error.message });
  }
};
