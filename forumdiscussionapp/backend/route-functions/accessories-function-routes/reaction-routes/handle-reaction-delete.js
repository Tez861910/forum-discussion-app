import { sequelize } from "../../../db.js";

export const handleReactionDelete = async (req, res) => {
  const { reactionId } = req.params;
  const Reactions = sequelize.models.Reactions;

  try {
    const result = await Reactions.destroy({
      where: {
        ReactionID: reactionId,
      },
    });

    if (result === 1) {
      console.log("Reaction deleted successfully");
      res.json({ message: "Reaction deleted successfully" });
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
