import { sequelize } from "../../../db.js";

export const handleImageCreate = async (req, res) => {
  const { eventId, imageUrl } = req.body;
  const EventImages = sequelize.models.EventImages;

  try {
    const result = await EventImages.create({
      EventID: eventId,
      ImageURL: imageUrl,
    });

    if (result) {
      console.log("Event image created successfully");
      res.json({ message: "Event image created successfully" });
    } else {
      console.error("Event image creation failed");
      res.status(500).json({ error: "Event image creation failed" });
    }
  } catch (error) {
    console.error("Error creating event image:", error);
    res
      .status(500)
      .json({ error: "Event image creation failed", details: error.message });
  }
};
