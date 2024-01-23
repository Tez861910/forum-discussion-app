import { sequelize } from "../../../db.js";

export const handleForumReplyGet = async (req, res) => {
  try {
    const ForumsReplies = sequelize.models.ForumsReplies;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const result = await ForumsReplies.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
    });

    console.log("Forum replies retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forum replies:", error);
    res
      .status(500)
      .json({ error: "Error getting forum replies", details: error.message });
  }
};
