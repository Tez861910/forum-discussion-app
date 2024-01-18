import { sequelize } from "../../../db.js";

export const handlePollGetCreatedByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Polls = sequelize.models.Polls;

    // Find all Polls associated with the given CreatedByUserID
    const result = await Polls.findAll({
      where: { CreatedByUserID: userId },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          required: true,
        },
      ],
    });

    console.log("Polls retrieved successfully for createdByUserId:", userId);
    res.json(result);
  } catch (error) {
    console.error("Error getting polls for createdByUserId:", userId, error);
    res
      .status(500)
      .json({ error: "Error getting polls", details: error.message });
  }
};
