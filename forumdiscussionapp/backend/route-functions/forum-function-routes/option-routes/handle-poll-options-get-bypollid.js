import { sequelize } from "../../../db.js";

export const handlePollOptionGetByPollId = async (req, res) => {
  const { pollId } = req.params;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const PollOptions = sequelize.models.PollOptions;

    // Find all PollOptions for the given pollId and check for IsDeleted in corresponding CommonAttributes table
    const result = await PollOptions.findAll({
      where: { PollID: pollId },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
          attributes: [],
        },
      ],
    });

    console.log("Poll options retrieved successfully for pollId:", pollId);
    res.json(result);
  } catch (error) {
    console.error("Error getting poll options for pollId:", pollId, error);
    res
      .status(500)
      .json({ error: "Error getting poll options", details: error.message });
  }
};
