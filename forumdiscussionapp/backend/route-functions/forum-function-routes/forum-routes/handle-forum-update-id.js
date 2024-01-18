import { sequelize } from "../../../db.js";

export const handleForumUpdateById = async (req, res) => {
  const { forumId } = req.params;
  const { forumName, forumDescription } = req.body;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      const Forums = sequelize.models.Forums;
      const CommonAttributes = sequelize.models.CommonAttributes;

      if (!forumName && !forumDescription) {
        console.log(
          "At least one field (forumName or forumDescription) is required for update"
        );
        return res.status(400).json({
          error:
            "At least one field (forumName or forumDescription) is required for update",
        });
      }

      // Update the forum
      const forumUpdateResult = await Forums.update(
        { ForumName: forumName, ForumDescription: forumDescription },
        { where: { ForumID: forumId }, transaction }
      );

      // Check if the forum was updated successfully
      if (forumUpdateResult[0] === 1) {
        // Get the CommonAttributeID from the updated forum
        const updatedForum = await Forums.findByPk(forumId, { transaction });
        const commonAttributeId = updatedForum.CommonAttributeID;

        // Insert UpdatedByUserID in CommonAttributes
        await CommonAttributes.update(
          {
            UpdatedByUserID: req.body.userId,
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

        console.log("Forum updated successfully");
        res.json({ message: "Forum updated successfully" });
      } else {
        console.error("Forum update failed");
        res.status(500).json({ error: "Forum update failed" });
      }
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error updating forum:", error);
      res
        .status(500)
        .json({ error: "Forum update failed", details: error.message });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
};
