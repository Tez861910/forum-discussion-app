import { sequelize } from "../../../db.js";

export const handleForumModeratorDeleteById = async (req, res) => {
  const { forumModeratorId } = req.params;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      const ForumModerators = sequelize.models.ForumModerators;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Fetch the forum moderator to get the associated CommonAttributeID
      const forumModerator = await ForumModerators.findByPk(forumModeratorId, {
        attributes: ["CommonAttributeID"],
        transaction,
      });

      if (!forumModerator) {
        console.error("Forum moderator not found");
        res.status(404).json({ error: "Forum moderator not found" });
        return;
      }

      const commonAttributeId = forumModerator.CommonAttributeID;

      // Soft delete the forum moderator by updating IsDeleted and DeletedByUserID
      const deleteResult = await CommonAttributes.update(
        {
          IsDeleted: true,
          DeletedByUserID: req.body.userId, // Assuming userId is available in req.body
        },
        {
          where: {
            AttributeID: commonAttributeId,
          },
          transaction,
        }
      );

      // Check if the forum moderator was soft deleted successfully
      if (deleteResult[0] === 1) {
        // Commit the transaction if everything is successful
        await transaction.commit();

        console.log("Forum moderator deleted successfully");
        res.json({ message: "Forum moderator deleted successfully" });
      } else {
        console.error("Forum moderator deletion failed");
        res.status(500).json({ error: "Forum moderator deletion failed" });
      }
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error deleting forum moderator:", error);
      res.status(500).json({
        error: "Error deleting forum moderator",
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
