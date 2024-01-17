import { sequelize } from "../../../db.js";

export const handleReactionGetAll = async (req, res) => {
  const Reactions = sequelize.models.Reactions;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const result = await Reactions.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: {
            AttributeID: sequelize.col("Reactions.CommonAttributeID"),
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("Reactions retrieved successfully");
    res.json({ reactions: result });
  } catch (error) {
    console.error("Error getting reactions:", error);
    res
      .status(500)
      .json({ error: "Error getting reactions", details: error.message });
  }
};
