import { sequelize } from "../../../db.js";

export const handlePollUpdateById = async (req, res) => {
  const { pollId } = req.params;
  const { question } = req.body;

  try {
    if (!question) {
      console.log("Question is required for update");
      return res.status(400).json({ error: "Question is required for update" });
    }

    const Polls = sequelize.models.Polls;

    const result = await Polls.update(
      { PollQuestion: question },
      { where: { PollID: pollId } }
    );

    if (result[0] === 1) {
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
