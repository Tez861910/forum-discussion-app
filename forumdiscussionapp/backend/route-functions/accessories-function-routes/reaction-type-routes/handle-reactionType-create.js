import { sequelize } from "../../../db.js";

export const handleReactionTypeCreate = async (req, res) => {
  const { reactionTypeName } = req.body;
  const ReactionTypes = sequelize.models.ReactionTypes;

  try {
    if (!reactionTypeName) {
      console.log("ReactionTypeName is required");
      return res.status(400).json({ error: "ReactionTypeName is required" });
    }

    const result = await ReactionTypes.create({
      ReactionTypeName: reactionTypeName,
    });

    if (result) {
      console.log("ReactionType created successfully");
      res.json({ message: "ReactionType created successfully" });
    } else {
      console.error("ReactionType creation failed");
      res.status(500).json({ error: "ReactionType creation failed" });
    }
  } catch (error) {
    console.error("Error creating reaction type:", error);
    res
      .status(500)
      .json({ error: "ReactionType creation failed", details: error.message });
  }
};
