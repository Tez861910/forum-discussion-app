import { sequelize } from "../../../db.js";

export const handleForumGetAll = async (req, res) => {
  try {
    // Get the Forums and CommonAttributes models
    const Forums = sequelize.models.Forums;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch forums and include related CommonAttributes with IsDeleted condition
    const result = await Forums.findAll({
      include: [
        {
          model: CommonAttributes,
          where: {
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("Forums retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forums:", error);
    res
      .status(500)
      .json({ error: "Error getting forums", details: error.message });
  }
};
