import { sequelize } from "../../../db.js";

export const handleReactionCreate = async (req, res) => {
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

    // Create CommonAttributes entry
    const commonAttributeResult = await CommonAttributes.create({
      CreatedByUserID: userId,
      UpdatedByUserID: userId,
    });

    // Check if CommonAttributes entry was created successfully
    if (!commonAttributeResult) {
      console.error("CommonAttributes creation failed");
      return res
        .status(500)
        .json({ error: "CommonAttributes creation failed" });
    }

    // Retrieve AttributeID from the created CommonAttributes entry
    const commonAttributeId = commonAttributeResult.AttributeID;

    // Create Reactions entry with CommonAttributeID
    const result = await Reactions.create({
      ReactionByUserID: userId,
      ReactionTypeID: reactionTypeId,
      ReactedToType: reactedToType,
      ReactedToID: reactedToId,
      IsPositive: isPositive,
      CommonAttributeID: commonAttributeId,
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
