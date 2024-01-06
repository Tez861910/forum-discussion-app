import { query } from "../../../db.js";

export const handlePrivateMessagesGetByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql =
      "SELECT * FROM PrivateMessages WHERE SenderID = ? OR ReceiverID = ?";
    const [result] = await query(sql, [userId, userId]);

    console.log("Private messages retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting private messages:", error);
    res
      .status(500)
      .json({
        error: "Error getting private messages",
        details: error.message,
      });
  }
};
