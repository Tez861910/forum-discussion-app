import { sequelize } from "../../../db.js";

export const handleAnnouncementDelete = async (req, res) => {
  const { announcementId, deletedByUserId } = req.params;
  const Announcements = sequelize.models.Announcements;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Step 1: Retrieve CommonAttributeID
    const announcement = await Announcements.findOne({
      attributes: ["CommonAttributeID"],
      where: { AnnouncementID: announcementId },
    });

    if (!announcement) {
      console.error("Announcement not found");
      return res.status(404).json({ error: "Announcement not found" });
    }

    const commonAttributeId = announcement.CommonAttributeID;

    // Step 2: Update IsDeleted status in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: deletedByUserId },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Step 3: Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Announcement marked as deleted successfully");
      res.json({ message: "Announcement marked as deleted successfully" });
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
