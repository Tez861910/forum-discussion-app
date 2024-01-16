import { sequelize } from "../../../db.js";

export const handlePollDeleteById = async (req, res) => {
  const { pollId } = req.params;

  try {
    const Polls = sequelize.models.Polls;

    const result = await Polls.destroy({ where: { PollID: pollId } });

    if (result === 1) {
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
