import { query } from "../../../db.js";

export const handleAnnouncementGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM Announcements";
    const [result] = await query(sql);

    console.log("Announcements retrieved successfully");
    res.json({ announcements: result });
  } catch (error) {
    console.error("Error getting announcements:", error);
    res
      .status(500)
      .json({ error: "Error getting announcements", details: error.message });
  }
};
