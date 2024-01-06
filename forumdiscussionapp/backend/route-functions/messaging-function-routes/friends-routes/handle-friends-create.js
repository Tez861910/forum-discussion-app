import { query } from "../../../db.js";

export const handleFriendsCreate = async (req, res) => {
  const { userId1, userId2 } = req.body;

  try {
    const sql = "INSERT INTO Friends (UserID1, UserID2) VALUES (?, ?)";
    const [result] = await query(sql, [userId1, userId2]);

    if (result.affectedRows === 1) {
      console.log("Friendship created successfully");
      res.json({ message: "Friendship created successfully" });
    } else {
      console.error("Friendship creation failed");
      res.status(500).json({ error: "Friendship creation failed" });
    }
  } catch (error) {
    console.error("Error creating friendship:", error);
    res
      .status(500)
      .json({ error: "Friendship creation failed", details: error.message });
  }
};
