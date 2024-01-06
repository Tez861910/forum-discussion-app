import { query } from "../../../db.js";

export const handlePollGetCreatedByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = "SELECT * FROM Polls WHERE CreatedByUserID = ?";
    const [result] = await query(sql, [userId]);

    console.log("Polls retrieved successfully for createdByUserId:", userId);
    res.json(result);
  } catch (error) {
    console.error("Error getting polls for createdByUserId:", userId, error);
    res
      .status(500)
      .json({ error: "Error getting polls", details: error.message });
  }
};
