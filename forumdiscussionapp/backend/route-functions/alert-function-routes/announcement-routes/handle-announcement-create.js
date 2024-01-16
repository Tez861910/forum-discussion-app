import { sequelize } from "../../../db.js";

export const handleAnnouncementCreate = async (req, res) => {
  const { title, content, expiryDate, createdByUserId } = req.body;
  const Announcements = sequelize.models.Announcements;

  try {
    if (!title || !content || !createdByUserId) {
      console.log("Title, content, and createdByUserId are required");
      return res
        .status(400)
        .json({ error: "Title, content, and createdByUserId are required" });
    }

    const result = await Announcements.create({
      AnnouncementTitle: title,
      AnnouncementContent: content,
      ExpiryDate: expiryDate,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("Announcement created successfully");
      res.json({ message: "Announcement created successfully" });
    } else {
      console.error("Announcement creation failed");
      res.status(500).json({ error: "Announcement creation failed" });
    }
  } catch (error) {
    console.error("Error creating announcement:", error);
    res
      .status(500)
      .json({ error: "Announcement creation failed", details: error.message });
  }
};
