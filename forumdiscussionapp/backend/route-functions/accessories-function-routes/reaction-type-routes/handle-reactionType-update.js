import { sequelize } from "../../../db.js";

export const handleReactionTypeUpdate = async (req, res) => {
  const { reactionTypeId } = req.params;
  const { reactionTypeName } = req.body;
  const ReactionTypes = sequelize.models.ReactionTypes;

  try {
    if (!reactionTypeName) {
      console.log("ReactionTypeName is required");
      return res.status(400).json({ error: "ReactionTypeName is required" });
    }

    const result = await ReactionTypes.update(
      {
        ReactionTypeName: reactionTypeName,
      },
      {
        where: {
          ReactionTypeID: reactionTypeId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("ReactionType updated successfully");
      res.json({ message: "ReactionType updated successfully" });
    } else {
      console.error("ReactionType update failed");
      res.status(500).json({ error: "ReactionType update failed" });
    }
  } catch (error) {
    console.error("Error updating reaction type:", error);
    res
      .status(500)
      .json({ error: "ReactionType update failed", details: error.message });
  }
};
