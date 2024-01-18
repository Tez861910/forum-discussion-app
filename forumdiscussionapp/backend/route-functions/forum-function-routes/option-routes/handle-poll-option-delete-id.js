import { sequelize } from "../../../db.js";

export const handlePollOptionDeleteById = async (req, res) => {
  const { pollOptionId, userId } = req.params;

  try {
    const PollOptions = sequelize.models.PollOptions;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the PollOption with CommonAttributeID
    const pollOption = await PollOptions.findOne({
      where: { PollOptionID: pollOptionId },
    });

    if (!pollOption) {
      console.error("Poll option not found");
      return res.status(404).json({ error: "Poll option not found" });
    }

    // Update IsDeleted to true and insert DeletedByUserID in CommonAttributes
    const commonAttributeUpdateResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: pollOption.CommonAttributeID },
      }
    );

    // Check if the update in CommonAttributes was successful
    if (commonAttributeUpdateResult[0] === 1) {
      console.log("Poll option deleted successfully");
      res.json({ message: "Poll option deleted successfully" });
    } else {
      console.error("Poll option deletion failed");
      res.status(500).json({ error: "Poll option deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting poll option:", error);
    res
      .status(500)
      .json({ error: "Error deleting poll option", details: error.message });
  }
};
