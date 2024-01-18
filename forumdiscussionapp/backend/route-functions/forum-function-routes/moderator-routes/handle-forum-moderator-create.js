import { sequelize } from "../../../db.js";

export const handleForumModeratorCreate = async (req, res) => {
  const { userId, forumId, promotedAt } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      const ForumModerators = sequelize.models.ForumModerators;
      const CommonAttributes = sequelize.models.CommonAttributes;

      if (!userId || !forumId || !promotedAt) {
        console.log("UserID, ForumID, and PromotedAt are required");
        return res
          .status(400)
          .json({ error: "UserID, ForumID, and PromotedAt are required" });
      }

      // Create the forum moderator
      const result = await ForumModerators.create(
        {
          UserID: userId,
          ForumID: forumId,
          PromotedAt: promotedAt,
        },
        { transaction }
      );

      // Check if the forum moderator was created successfully
      if (result) {
        // Insert CreatedByUserID in CommonAttributes
        await CommonAttributes.create(
          {
            CreatedByUserID: userId,
          },
          { transaction }
        );

        // Commit the transaction if everything is successful
        await transaction.commit();

        console.log("Forum moderator created successfully");
        res.json({ message: "Forum moderator created successfully" });
      } else {
        console.error("Forum moderator creation failed");
        res.status(500).json({ error: "Forum moderator creation failed" });
      }
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error creating forum moderator:", error);
      res.status(500).json({
        error: "Forum moderator creation failed",
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
