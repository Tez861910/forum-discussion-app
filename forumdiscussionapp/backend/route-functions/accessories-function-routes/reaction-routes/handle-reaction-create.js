import { sequelize } from "../../../db.js";

export const handleReactionCreate = async (req, res) => {
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

    const result = await Reactions.create({
      ReactionByUserID: userId,
      ReactionTypeID: reactionTypeId,
      ReactedToType: reactedToType,
      ReactedToID: reactedToId,
      IsPositive: isPositive,
    });

    if (result) {
      console.log("Reaction created successfully");
      res.json({ message: "Reaction created successfully" });
    } else {
      console.error("Reaction creation failed");
      res.status(500).json({ error: "Reaction creation failed" });
    }
  } catch (error) {
    console.error("Error creating reaction:", error);
    res
      .status(500)
      .json({ error: "Reaction creation failed", details: error.message });
  }
};
