import { sequelize } from "../../../db.js";

export const handleReactionUpdate = async (req, res) => {
  const { reactionId } = req.params;
  const { userId, reactionTypeId, reactedToType, reactedToId, isPositive } =
    req.body;
  const Reactions = sequelize.models.Reactions;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (
      !userId ||
      !reactionTypeId ||
      !reactedToType ||
      !reactedToId ||
      isPositive === undefined
    ) {
      console.log(
        "UserId, ReactionTypeId, ReactedToType, ReactedToId, and IsPositive are required"
      );
      return res.status(400).json({
        error:
          "UserId, ReactionTypeId, ReactedToType, ReactedToId, and IsPositive are required",
      });
    }

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

    // Update Reactions data
    const result = await Reactions.update(
      {
        ReactionByUserID: userId,
        ReactionTypeID: reactionTypeId,
        ReactedToType: reactedToType,
        ReactedToID: reactedToId,
        IsPositive: isPositive,
      },
      {
        where: {
          ReactionID: reactionId,
        },
      }
    );

    // Check if the update was successful
    if (result[0] === 1) {
      // Update UpdatedByUserID in CommonAttributes table
      await CommonAttributes.update(
        { UpdatedByUserID: userId },
        {
          where: {
            AttributeID: commonAttributeId,
          },
        }
      );

      console.log("Reaction updated successfully");
      res.json({ message: "Reaction updated successfully" });
    } else {
      console.error("Reaction update failed");
      res.status(500).json({ error: "Reaction update failed" });
    }
  } catch (error) {
    console.error("Error updating reaction:", error);
    res
      .status(500)
      .json({ error: "Reaction update failed", details: error.message });
  }
};
