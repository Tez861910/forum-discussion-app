import { sequelize } from "../../../db.js";

export const handleCommentCreate = async (req, res) => {
  const { threadId } = req.params;
  const { content, userId } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      if (!content) {
        console.log("Comment content is required");
        return res.status(400).json({ error: "Comment content is required" });
      }

      // Get the Comments and CommonAttributes models
      const Comments = sequelize.models.Comments;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Create a new entry in CommonAttributes with CreatedByUserID
      const commonAttributesResult = await CommonAttributes.create(
        {
          CreatedByUserID: userId,
        },
        { transaction }
      );

      // Extract the AttributeID from the created entry
      const commonAttributeId = commonAttributesResult.AttributeID;

      // Create a new comment with CommonAttributeID
      const result = await Comments.create(
        {
          CommentContent: content,
          UserID: userId,
          ThreadID: threadId,
          CommonAttributeID: commonAttributeId,
        },
        { transaction }
      );

      // Commit the transaction if everything is successful
      await transaction.commit();

      console.log("Comment created successfully");
      res.json({ message: "Comment created successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error creating comment:", error);
      res
        .status(500)
        .json({ error: "Comment creation failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
