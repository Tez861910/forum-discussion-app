import { sequelize } from "../../../db.js";

export const handleForumDeleteById = async (req, res) => {
  const { forumId } = req.params;

  try {
    // Start a transaction to ensure atomicity
    const transaction = await sequelize.transaction();

    try {
      // Get the Forums and CommonAttributes models
      const Forums = sequelize.models.Forums;
      const CommonAttributes = sequelize.models.CommonAttributes;

      // Find the forum to be soft-deleted
      const forum = await Forums.findByPk(forumId, { transaction });

      if (!forum) {
        console.error("Forum not found for deletion");
        res.status(404).json({ error: "Forum not found for deletion" });
        return;
      }

      // Get the CommonAttributeID from the forum
      const commonAttributeId = forum.CommonAttributeID;

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

      console.log("Forum soft-deleted successfully");
      res.json({ message: "Forum soft-deleted successfully" });
    } catch (error) {
      // Rollback the transaction in case of any errors
      await transaction.rollback();

      console.error("Error soft-deleting forum:", error);
      res.status(500).json({
        error: "Forum soft-deletion failed",
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
