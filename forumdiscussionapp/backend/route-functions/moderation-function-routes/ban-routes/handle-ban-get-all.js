import { sequelize } from "../../../db.js";

export const handleBanGetAll = async (req, res) => {
  try {
    // Dynamically access the Bans and CommonAttributes models using sequelize.models
    const { Bans, CommonAttributes } = sequelize.models;

    const result = await Bans.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    console.log("Bans retrieved successfully");
    res.json({ bans: result });
  } catch (error) {
    console.error("Error getting bans:", error);
    res
      .status(500)
      .json({ error: "Error getting bans", details: error.message });
  }
};
