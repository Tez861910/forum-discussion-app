import { query } from "../../../db.js";

export const getAllEvents = async (req, res) => {
  try {
    // Selecting relevant fields from both Events and CommonAttributes tables
    const events = await query(
      `
      SELECT E.*, CA.CreatedAt, CA.CreatedByUserID, CA.IsDeleted
      FROM Events AS E
      JOIN CommonAttributes AS CA ON E.CommonAttributeID = CA.AttributeID
      WHERE CA.IsDeleted = false
    `
    );

    res.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, error: "Error fetching events" });
  }
};
