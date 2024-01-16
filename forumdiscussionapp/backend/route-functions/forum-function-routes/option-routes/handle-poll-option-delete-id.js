import { sequelize } from "../../../db.js";

export const handlePollOptionDeleteById = async (req, res) => {
  const { pollOptionId } = req.params;

  try {
    const PollOptions = sequelize.models.PollOptions;

    const result = await PollOptions.destroy({
      where: { PollOptionID: pollOptionId },
    });

    if (result === 1) {
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
