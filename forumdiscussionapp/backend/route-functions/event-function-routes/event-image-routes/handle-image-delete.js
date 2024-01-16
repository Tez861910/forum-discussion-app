import { sequelize } from "../../../db.js";

export const handleImageDelete = async (req, res) => {
  const { imageId } = req.params;
  const EventImages = sequelize.models.EventImages;

  try {
    const result = await EventImages.destroy({
      where: { ImageID: imageId },
    });

    if (result === 1) {
      console.log("Event image deleted successfully");
      res.json({ message: "Event image deleted successfully" });
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
