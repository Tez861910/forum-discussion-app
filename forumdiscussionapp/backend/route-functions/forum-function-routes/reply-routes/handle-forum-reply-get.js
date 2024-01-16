import { sequelize } from "../../../db.js";

export const handleForumReplyGet = async (req, res) => {
  try {
    const ForumReplies = sequelize.models.ForumReplies;

    const result = await ForumReplies.findAll();

    console.log("Forum replies retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forum replies:", error);
    res
      .status(500)
      .json({ error: "Error getting forum replies", details: error.message });
  }
};
