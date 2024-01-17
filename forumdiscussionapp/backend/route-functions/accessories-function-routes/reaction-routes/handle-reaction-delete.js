import { sequelize } from "../../../db.js";

export const handleReactionDelete = async (req, res) => {
  const { reactionId } = req.params;
  const Reactions = sequelize.models.Reactions;
  const CommonAttributes = sequelize.models.CommonAttributes;
  const { deletedByUserId } = req.body;

  try {
    // Find the Reaction by ID
    const reaction = await Reactions.findOne({
      where: {
        ReactionID: reactionId,
      },
    });

    // Check if the reaction exists
    if (!reaction) {
      console.error("Reaction not found");
      return res.status(404).json({ error: "Reaction not found" });
    }

    // Retrieve CommonAttributeID from the Reaction
    const commonAttributeId = reaction.CommonAttributeID;

    // Update IsDeleted status and DeletedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: deletedByUserId,
      },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Reaction marked as deleted successfully");
      res.json({ message: "Reaction marked as deleted successfully" });
    } else {
      console.error("Reaction deletion failed");
      res.status(500).json({ error: "Reaction deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting reaction:", error);
    res
      .status(500)
      .json({ error: "Reaction deletion failed", details: error.message });
  }
};
