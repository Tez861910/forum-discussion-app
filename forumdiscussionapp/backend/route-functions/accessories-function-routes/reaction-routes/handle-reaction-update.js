import { sequelize } from "../../../db.js";

export const handleReactionUpdate = async (req, res) => {
  const { reactionId } = req.params;
  const { userId, reactionTypeId, reactedToType, reactedToId, isPositive } =
    req.body;
  const Reactions = sequelize.models.Reactions;

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

    if (result[0] === 1) {
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
