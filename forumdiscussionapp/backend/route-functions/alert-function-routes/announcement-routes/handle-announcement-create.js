import { sequelize } from "../../../db.js";

export const handleAnnouncementCreate = async (req, res) => {
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

    // Step 1: Create CommonAttributes entry
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: createdByUserId,
    });

    if (!commonAttributesResult) {
      console.error("CommonAttributes creation failed");
      return res
        .status(500)
        .json({ error: "CommonAttributes creation failed" });
    }

    // Step 2: Retrieve AttributeID
    const commonAttributeId = commonAttributesResult.AttributeID;

    // Step 3: Create Announcement with CommonAttributeID
    const announcementResult = await Announcements.create({
      AnnouncementTitle: title,
      AnnouncementContent: content,
      ExpiryDate: expiryDate,
      CreatedByUserID: createdByUserId,
      CommonAttributeID: commonAttributeId,
    });

    if (announcementResult) {
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
