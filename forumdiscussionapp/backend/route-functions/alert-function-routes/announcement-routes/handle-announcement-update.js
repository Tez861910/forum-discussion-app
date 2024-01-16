import { sequelize } from "../../../db.js";

export const handleAnnouncementUpdate = async (req, res) => {
  const { announcementId } = req.params;
  const { title, content, expiryDate, createdByUserId } = req.body;
  const Announcements = sequelize.models.Announcements;

  try {
    if (!title || !content || !createdByUserId) {
      console.log("Title, content, and createdByUserId are required");
      return res
        .status(400)
        .json({ error: "Title, content, and createdByUserId are required" });
    }

    const result = await Announcements.update(
      {
        AnnouncementTitle: title,
        AnnouncementContent: content,
        ExpiryDate: expiryDate,
        CreatedByUserID: createdByUserId,
      },
      { where: { AnnouncementID: announcementId } }
    );

    if (result[0] === 1) {
      console.log("Announcement updated successfully");
      res.json({ message: "Announcement updated successfully" });
    } else {
      console.error("Announcement update failed");
      res.status(500).json({ error: "Announcement update failed" });
    }
  } catch (error) {
    console.error("Error updating announcement:", error);
    res
      .status(500)
      .json({ error: "Announcement update failed", details: error.message });
  }
};
