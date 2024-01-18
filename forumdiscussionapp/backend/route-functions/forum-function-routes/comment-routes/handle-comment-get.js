import { sequelize } from "../../../db.js";

export const handleCommentGet = async (req, res) => {
  const { threadId } = req.params;

  try {
    // Get the Comments and CommonAttributes models
    const Comments = sequelize.models.Comments;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Define the association between Comments and CommonAttributes
    Comments.belongsTo(CommonAttributes, {
      foreignKey: "CommonAttributeID",
      targetKey: "AttributeID",
    });

    // Fetch comments and include related CommonAttributes with IsDeleted condition
    const results = await Comments.findAll({
      where: { ThreadID: threadId },
      include: [
        {
          model: CommonAttributes,
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("Comments fetched successfully");
    res.json({ comments: results });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ error: "Comment retrieval failed", details: error.message });
  }
};
