import { sequelize } from "../../../db.js";

export const handlePollGet = async (req, res) => {
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const Polls = sequelize.models.Polls;

    // Find all Polls where IsDeleted is false in associated CommonAttributes table
    const result = await Polls.findAll({
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
        },
      ],
    });

    console.log("Polls retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting polls:", error);
    res
      .status(500)
      .json({ error: "Error getting polls", details: error.message });
  }
};
