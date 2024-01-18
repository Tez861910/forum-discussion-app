import { sequelize } from "../../../db.js";

export const handleImageUpdate = async (req, res) => {
  const { imageId } = req.params;
  const { eventId, imageUrl, userId } = req.body;
  const EventImages = sequelize.models.EventImages;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const result = await EventImages.update(
      { EventID: eventId, ImageURL: imageUrl },
      { where: { ImageID: imageId } }
    );

    if (result[0] === 1) {
      // Get CommonAttributeID from the updated EventImages data
      const commonAttributeId = (
        await EventImages.findOne({
          where: { ImageID: imageId },
        })
      ).CommonAttributeID;

      // Update UpdatedByUserID in CommonAttributes table
      await CommonAttributes.update(
        { UpdatedByUserID: userId },
        { where: { AttributeID: commonAttributeId } }
      );

      console.log("Event image updated successfully");
      res.json({ message: "Event image updated successfully" });
    } else {
      console.error("Event image update failed");
      res.status(500).json({ error: "Event image update failed" });
    }
  } catch (error) {
    console.error("Error updating event image:", error);
    res
      .status(500)
      .json({ error: "Event image update failed", details: error.message });
  }
};
