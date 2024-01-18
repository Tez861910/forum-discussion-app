import { sequelize } from "../../../db.js";

export const handleForumGetById = async (req, res) => {
  const { forumId } = req.params;

  try {
    // Get the Forums and CommonAttributes models
    const Forums = sequelize.models.Forums;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Define the association between Forums and CommonAttributes
    Forums.belongsTo(CommonAttributes, {
      foreignKey: "CommonAttributeID",
      targetKey: "AttributeID",
    });

    // Fetch a specific forum by ID and include related CommonAttributes with IsDeleted condition
    const result = await Forums.findOne({
      where: { ForumID: forumId },
      include: [
        {
          model: CommonAttributes,
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    if (result) {
      console.log("Forum retrieved successfully");
      res.json(result);
    } else {
      console.error("Forum not found");
      res.status(404).json({ error: "Forum not found" });
    }
  } catch (error) {
    console.error("Error getting forum:", error);
    res
      .status(500)
      .json({ error: "Error getting forum", details: error.message });
  }
};
