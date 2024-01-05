import { query } from "../../../db.js";

export const handleImageCreate = async (req, res) => {
  const { eventId, imageUrl } = req.body;

  try {
    const sql = "INSERT INTO EventImages (EventID, ImageURL) VALUES (?, ?)";
    const [result] = await query(sql, [eventId, imageUrl]);

    if (result.affectedRows === 1) {
      console.log("Event image created successfully");
      res.json({ message: "Event image created successfully" });
    } else {
      console.error("Event image creation failed");
      res.status(500).json({ error: "Event image creation failed" });
    }
  } catch (error) {
    console.error("Error creating event image:", error);
    res
      .status(500)
      .json({ error: "Event image creation failed", details: error.message });
  }
};
