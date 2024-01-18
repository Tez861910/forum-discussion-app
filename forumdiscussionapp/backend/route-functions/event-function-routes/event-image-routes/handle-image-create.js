import { sequelize } from "../../../db.js";

export const handleImageCreate = async (req, res) => {
  const { eventId, imageUrl, userId } = req.body;
  const EventImages = sequelize.models.EventImages;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.id;

    // Insert into EventImages table using CommonAttributeID
    const result = await EventImages.create({
      EventID: eventId,
      ImageURL: imageUrl,
      CommonAttributeID: commonAttributeID,
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
