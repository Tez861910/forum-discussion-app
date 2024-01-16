import { sequelize } from "../../../db.js";

export const getEventCategories = async (req, res) => {
  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const EventCategories = sequelize.models.EventCategories;

    // Selecting relevant fields from both EventCategories and CommonAttributes tables
    const categories = await EventCategories.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: ["IsDeleted"],
        },
      ],
    });

    res.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching event categories:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching event categories" });
  }
};
