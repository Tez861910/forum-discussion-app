import { sequelize } from "../../../db.js";

export const handleCommentDeleteId = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the Comments and CommonAttributes models
      const Comments = sequelize.models.Comments;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Find the comment to be soft-deleted
      const comment = await Comments.findByPk(commentId, { transaction });

      if (!comment) {
        console.error("Comment not found for deletion");
        res.status(404).json({ error: "Comment not found for deletion" });
        return;
      }

      // Get the CommonAttributeID from the comment
      const commonAttributeId = comment.CommonAttributeID;

      // Update CommonAttributes for soft deletion
      await CommonAttributes.update(
        {
          IsDeleted: true,
          DeletedByUserID: req.body.userId,
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

      console.log("Comment soft-deleted successfully");
      res.json({ message: "Comment soft-deleted successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error soft-deleting comment:", error);
      res.status(500).json({
        error: "Comment soft-deletion failed",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
