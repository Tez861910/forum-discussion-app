import { sequelize } from "../../../db.js";

export const handleImageGetAll = async (req, res) => {
  const EventImages = sequelize.models.EventImages;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const result = await EventImages.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: ["IsDeleted"],
        },
      ],
    });

    console.log("Event images retrieved successfully");
    res.json({ eventImages: result });
  } catch (error) {
    console.error("Error getting event images:", error);
    res
      .status(500)
      .json({ error: "Error getting event images", details: error.message });
  }
};
