import { sequelize } from "../../../db.js";

export const handleCommentUpdateId = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the Comments and CommonAttributes models
      const Comments = sequelize.models.Comments;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Update the comment
      const resultUpdate = await Comments.update(
        { CommentContent: content },
        { where: { CommentID: commentId }, transaction }
      );

      if (resultUpdate[0] !== 1) {
        // If no rows were updated, the comment doesn't exist
        console.error("Comment not found for update");
        res.status(404).json({ error: "Comment not found for update" });
        return;
      }

      // Get the CommonAttributeID from the updated comment
      const updatedComment = await Comments.findByPk(commentId, {
        transaction,
      });
      const commonAttributeId = updatedComment.CommonAttributeID;

      // Update CommonAttributes with UpdatedByUserID
      await CommonAttributes.update(
        {
          UpdatedByUserID: userId,
        },
        {
          where: {
            AttributeID: commonAttributeId,
          },
          transaction,
        }
      );

      // Commit the transaction if everything is successful
      await transaction.commit();

      console.log("Comment updated successfully");
      res.json({ message: "Comment updated successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error updating comment:", error);
      res
        .status(500)
        .json({ error: "Comment update failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
