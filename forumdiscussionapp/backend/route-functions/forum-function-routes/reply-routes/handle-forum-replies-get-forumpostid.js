import { query } from "../../../db.js";

export const handleForumReplyGetForumPostId = async (req, res) => {
  const { forumPostId } = req.params;

  try {
    const sql = "SELECT * FROM ForumsReplies WHERE ForumPostID = ?";
    const result = await query(sql, [forumPostId]);

    console.log(
      "Forum replies retrieved successfully for forumPostId:",
      forumPostId
    );
    res.json(result);
  } catch (error) {
    console.error(
      "Error getting forum replies for forumPostId:",
      forumPostId,
      error
    );
    res
      .status(500)
      .json({ error: "Error getting forum replies", details: error.message });
  }
};
