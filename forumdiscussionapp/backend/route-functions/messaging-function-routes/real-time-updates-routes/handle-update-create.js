import { query } from "../../../db.js";

export const handleUpdateCreate = async (req, res) => {
  const { userId, updateType, data } = req.body;

  try {
    const sql =
      "INSERT INTO RealTimeUpdates (UserID, UpdateType, Data) VALUES (?, ?, ?)";
    const [result] = await query(sql, [userId, updateType, data]);

    if (result.affectedRows === 1) {
      console.log("Real-time update created successfully");
      res.json({ message: "Real-time update created successfully" });
    } else {
      console.error("Real-time update creation failed");
      res.status(500).json({ error: "Real-time update creation failed" });
    }
  } catch (error) {
    console.error("Error creating real-time update:", error);
    res
      .status(500)
      .json({
        error: "Real-time update creation failed",
        details: error.message,
      });
  }
};
