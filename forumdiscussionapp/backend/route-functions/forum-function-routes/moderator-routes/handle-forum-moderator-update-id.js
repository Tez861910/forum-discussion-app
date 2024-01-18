import { sequelize } from "../../../db.js";

export const handleForumModeratorUpdateById = async (req, res) => {
  const { forumModeratorId } = req.params;
  const { userId, forumId, promotedAt } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      const ForumModerators = sequelize.models.ForumModerators;
      const CommonAttributes = sequelize.models.CommonAttributes;

      if (!userId || !forumId || !promotedAt) {
        console.log("UserID, ForumID, and PromotedAt are required for update");
        return res.status(400).json({
          error: "UserID, ForumID, and PromotedAt are required for update",
        });
      }

      // Update the forum moderator
      const result = await ForumModerators.update(
        { UserID: userId, ForumID: forumId, PromotedAt: promotedAt },
        { where: { ForumModeratorID: forumModeratorId }, transaction }
      );

      // Check if the forum moderator was updated successfully
      if (result[0] === 1) {
        // Get the CommonAttributeID associated with the forum moderator
        const forumModerator = await ForumModerators.findByPk(
          forumModeratorId,
          {
            attributes: ["CommonAttributeID"],
            transaction,
          }
        );

        if (!forumModerator) {
          console.error("Forum moderator not found");
          res.status(404).json({ error: "Forum moderator not found" });
          return;
        }

        const commonAttributeId = forumModerator.CommonAttributeID;

        // Insert UpdatedByUserID in CommonAttributes
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

        console.log("Forum moderator updated successfully");
        res.json({ message: "Forum moderator updated successfully" });
      } else {
        console.error("Forum moderator update failed");
        res.status(500).json({ error: "Forum moderator update failed" });
      }
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error updating forum moderator:", error);
      res
        .status(500)
        .json({
          error: "Forum moderator update failed",
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
