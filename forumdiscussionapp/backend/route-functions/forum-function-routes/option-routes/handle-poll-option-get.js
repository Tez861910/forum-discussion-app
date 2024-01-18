import { sequelize } from "../../../db.js";

export const handlePollOptionGet = async (req, res) => {
  try {
    const PollOptions = sequelize.models.PollOptions;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find all PollOptions where IsDeleted is false in corresponding CommonAttributes table
    const result = await PollOptions.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    console.log("Poll options retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting poll options:", error);
    res
      .status(500)
      .json({ error: "Error getting poll options", details: error.message });
  }
};
