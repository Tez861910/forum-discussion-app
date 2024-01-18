import { sequelize } from "../../../db.js";

export const handlePollUpdateById = async (req, res) => {
  const { pollId } = req.params;
  const { question, updatedByUserId } = req.body;

  try {
    if (!question) {
      console.log("Question is required for update");
      return res.status(400).json({ error: "Question is required for update" });
    }

    const CommonAttributes = sequelize.models.CommonAttributes;
    const Polls = sequelize.models.Polls;

    // Find the corresponding CommonAttributes record based on PollID
    const commonAttribute = await CommonAttributes.findOne({
      where: { CommonAttributeID: pollId },
    });

    if (!commonAttribute) {
      console.error("CommonAttributes record not found");
      return res
        .status(404)
        .json({ error: "CommonAttributes record not found" });
    }

    // Update Polls table and insert UpdatedByUserID into CommonAttributes table
    const result = await Polls.update(
      { PollQuestion: question },
      { where: { PollID: pollId } }
    );

    if (result[0] === 1) {
      // Update the UpdatedByUserID in CommonAttributes table
      await CommonAttributes.update(
        { UpdatedByUserID: updatedByUserId },
        { where: { CommonAttributeID: pollId } }
      );

      console.log("Poll updated successfully");
      res.json({ message: "Poll updated successfully" });
    } else {
      console.error("Poll update failed");
      res.status(500).json({ error: "Poll update failed" });
    }
  } catch (error) {
    console.error("Error updating poll:", error);
    res
      .status(500)
      .json({ error: "Poll update failed", details: error.message });
  }
};
