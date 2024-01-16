import { sequelize } from "../../../db.js";

export const handleImageUpdate = async (req, res) => {
  const { imageId } = req.params;
  const { eventId, imageUrl } = req.body;
  const EventImages = sequelize.models.EventImages;

  try {
    const result = await EventImages.update(
      { EventID: eventId, ImageURL: imageUrl },
      { where: { ImageID: imageId } }
    );

    if (result[0] === 1) {
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
