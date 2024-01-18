import { sequelize } from "../../../db.js";

export const handlePollDeleteById = async (req, res) => {
  const { pollId, userId } = req.params;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    const Polls = sequelize.models.Polls;

    // Find the Poll record to get the associated CommonAttributeID
    const pollRecord = await Polls.findOne({ where: { PollID: pollId } });

    if (!pollRecord) {
      console.error("Poll not found");
      return res.status(404).json({ error: "Poll not found" });
    }

    // Update IsDeleted to true and DeletedByUserID in CommonAttributes table
    const commonAttributeUpdateResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: pollRecord.CommonAttributeID },
      }
    );

    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Poll deleted successfully");
      res.json({ message: "Poll deleted successfully" });
    } else {
      console.error("Poll deletion failed");
      res.status(500).json({ error: "Poll deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting poll:", error);
    res
      .status(500)
      .json({ error: "Error deleting poll", details: error.message });
  }
};
