import { sequelize } from "../../../db.js";

export const handleForumPostGet = async (req, res) => {
  try {
    const ForumsPosts = sequelize.models.ForumsPosts;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const result = await ForumsPosts.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
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
