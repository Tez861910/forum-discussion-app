import { sequelize } from "../../../db.js";

export const handleImageDelete = async (req, res) => {
  const { imageId, userId } = req.params;
  const EventImages = sequelize.models.EventImages;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Find the EventImage by ID
    const eventImage = await EventImages.findOne({
      where: { ImageID: imageId },
    });

    // Check if the event image exists
    if (!eventImage) {
      console.error("Event image not found");
      return res.status(404).json({ error: "Event image not found" });
    }

    // Retrieve CommonAttributeID from the EventImage
    const commonAttributeId = eventImage.CommonAttributeID;

    // Update IsDeleted status in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: {
          AttributeID: commonAttributeId,
          IsDeleted: false,
        },
      }
    );

    // Check if the update was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Event image marked as deleted successfully");
      res.json({ message: "Event image marked as deleted successfully" });
    } else {
      console.error("Event image deletion failed");
      res.status(500).json({ error: "Event image deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting event image:", error);
    res
      .status(500)
      .json({ error: "Event image deletion failed", details: error.message });
  }
};
