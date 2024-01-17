import { sequelize } from "../../../db.js";

export const handleAnnouncementGetAll = async (req, res) => {
  const Announcements = sequelize.models.Announcements;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const result = await Announcements.findAll({
      where: {
        CommonAttributeID: {
          [sequelize.Sequelize.Op.not]: null,
        },
      },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: {
            AttributeID: sequelize.col("Announcements.CommonAttributeID"),
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("Announcements retrieved successfully");
    res.json({ announcements: result });
  } catch (error) {
    console.error("Error getting announcements:", error);
    res
      .status(500)
      .json({ error: "Error getting announcements", details: error.message });
  }
};
