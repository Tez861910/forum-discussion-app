import { query } from "../../../db.js";

export const handleUserPollVoteGetByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = "SELECT * FROM UserPollVotes WHERE UserID = ?";
    const [result] = await query(sql, [userId]);

    console.log("User poll votes retrieved successfully for userId:", userId);
    res.json(result);
  } catch (error) {
    console.error("Error getting user poll votes for userId:", userId, error);
    res
      .status(500)
      .json({ error: "Error getting user poll votes", details: error.message });
  }
};
