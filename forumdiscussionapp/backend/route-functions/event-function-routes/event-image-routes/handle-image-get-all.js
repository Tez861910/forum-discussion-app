import { query } from "../../../db.js";

export const handleImageGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM EventImages";
    const [result] = await query(sql);

    console.log("Event images retrieved successfully");
    res.json({ eventImages: result });
  } catch (error) {
    console.error("Error getting event images:", error);
    res
      .status(500)
      .json({ error: "Error getting event images", details: error.message });
  }
};
