import { sequelize } from "../../../db.js";

export const handleAnnouncementUpdate = async (req, res) => {
  const { announcementId } = req.params;
  const { title, content, expiryDate, createdByUserId } = req.body;
  const Announcements = sequelize.models.Announcements;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    if (!title || !content || !createdByUserId) {
      console.log("Title, content, and createdByUserId are required");
      return res
        .status(400)
        .json({ error: "Title, content, and createdByUserId are required" });
    }

    // Find the existing announcement
    const existingAnnouncement = await Announcements.findOne({
      where: { AnnouncementID: announcementId },
    });

    if (!existingAnnouncement) {
      console.error("Announcement not found");
      return res.status(404).json({ error: "Announcement not found" });
    }

    // Update the announcement
    const result = await Announcements.update(
      {
        AnnouncementTitle: title,
        AnnouncementContent: content,
        ExpiryDate: expiryDate,
        CreatedByUserID: createdByUserId,
      },
      { where: { AnnouncementID: announcementId } }
    );

    // Update the CommonAttributes table with updatedByUserId
    const commonAttributeUpdateResult = await CommonAttributes.update(
      { UpdatedByUserID: createdByUserId },
      {
        where: {
          AttributeID: existingAnnouncement.CommonAttributeID,
          IsDeleted: false,
        },
      }
    );

    if (result[0] === 1 && commonAttributeUpdateResult[0] === 1) {
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
