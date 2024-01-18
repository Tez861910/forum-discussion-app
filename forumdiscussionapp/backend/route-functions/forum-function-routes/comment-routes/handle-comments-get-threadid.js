import { sequelize } from "../../../db.js";

export const handleCommentGetThreadId = async (req, res) => {
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

    res.status(200).json({ comments: results });
  } catch (error) {
    console.error("Failed to retrieve comments:", error);
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};
