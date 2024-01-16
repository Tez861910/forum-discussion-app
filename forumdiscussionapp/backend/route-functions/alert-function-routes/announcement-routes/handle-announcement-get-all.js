import { sequelize } from "../../../db.js";

export const handleAnnouncementGetAll = async (req, res) => {
  const Announcements = sequelize.models.Announcements;

  try {
    const result = await Announcements.findAll();

    console.log("Announcements retrieved successfully");
    res.json({ announcements: result });
  } catch (error) {
    console.error("Error getting announcements:", error);
    res
      .status(500)
      .json({ error: "Error getting announcements", details: error.message });
  }
};
