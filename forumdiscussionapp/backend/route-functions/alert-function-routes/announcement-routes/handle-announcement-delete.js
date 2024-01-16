import { sequelize } from "../../../db.js";

export const handleAnnouncementDelete = async (req, res) => {
  const { announcementId } = req.params;
  const Announcements = sequelize.models.Announcements;

  try {
    const result = await Announcements.destroy({
      where: { AnnouncementID: announcementId },
    });

    if (result === 1) {
      console.log("Announcement deleted successfully");
      res.json({ message: "Announcement deleted successfully" });
    } else {
      console.error("Announcement deletion failed");
      res.status(500).json({ error: "Announcement deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res
      .status(500)
      .json({ error: "Announcement deletion failed", details: error.message });
  }
};
