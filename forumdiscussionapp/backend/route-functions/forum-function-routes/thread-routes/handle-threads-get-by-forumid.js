import { query } from "../../../db.js";

export const handleThreadsGetForumId = async (req, res) => {
  const forumId = req.params.forumId;
  console.log("Received forumId:", forumId);

  try {
    const sql = "SELECT * FROM threads WHERE ForumID = ?";
    const results = await query(sql, [forumId]);
    console.log("Threads data:", results);

    res.json(results);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res
      .status(500)
      .json({ error: "Thread retrieval failed", details: error.message });
  }
};