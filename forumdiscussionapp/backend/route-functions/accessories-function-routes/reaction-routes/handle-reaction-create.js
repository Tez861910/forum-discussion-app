import { query } from "../../../db.js";

export const handleReactionCreate = async (req, res) => {
  const { userId, reactionTypeId, reactedToType, reactedToId, isPositive } =
    req.body;

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

    const sql =
      "INSERT INTO Reactions (ReactionByUserID, ReactionTypeID, ReactedToType, ReactedToID, IsPositive) VALUES (?, ?, ?, ?, ?)";
    const [result] = await query(sql, [
      userId,
      reactionTypeId,
      reactedToType,
      reactedToId,
      isPositive,
    ]);

    if (result.affectedRows === 1) {
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
