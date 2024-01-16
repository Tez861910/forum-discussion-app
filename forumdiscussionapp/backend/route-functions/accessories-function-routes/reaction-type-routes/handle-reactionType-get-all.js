import { sequelize } from "../../../db.js";

export const handleReactionTypeGetAll = async (req, res) => {
  const ReactionTypes = sequelize.models.ReactionTypes;
  try {
    const result = await ReactionTypes.findAll();

    console.log("ReactionTypes retrieved successfully");
    res.json({ reactionTypes: result });
  } catch (error) {
    console.error("Error getting reaction types:", error);
    res
      .status(500)
      .json({ error: "Error getting reaction types", details: error.message });
  }
};
