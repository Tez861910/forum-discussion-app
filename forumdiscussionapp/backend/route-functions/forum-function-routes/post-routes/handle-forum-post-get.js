import { sequelize } from "../../../db.js";

export const handleForumPostGet = async (req, res) => {
  try {
    const ForumPosts = sequelize.models.ForumPosts;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const result = await ForumPosts.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
    });

    console.log("Forum posts retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forum posts:", error);
    res
      .status(500)
      .json({ error: "Error getting forum posts", details: error.message });
  }
};
