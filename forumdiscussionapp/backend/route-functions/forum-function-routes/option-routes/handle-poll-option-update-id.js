import { sequelize } from "../../../db.js";

export const handlePollOptionUpdateById = async (req, res) => {
  const { pollOptionId } = req.params;
  const { optionText } = req.body;

  try {
    if (!optionText) {
      console.log("OptionText is required for update");
      return res
        .status(400)
        .json({ error: "OptionText is required for update" });
    }

    const PollOptions = sequelize.models.PollOptions;

    const result = await PollOptions.update(
      { OptionText: optionText },
      { where: { PollOptionID: pollOptionId } }
    );

    if (result[0] === 1) {
      console.log("Poll option updated successfully");
      res.json({ message: "Poll option updated successfully" });
    } else {
      console.error("Poll option update failed");
      res.status(500).json({ error: "Poll option update failed" });
    }
  } catch (error) {
    console.error("Error updating poll option:", error);
    res
      .status(500)
      .json({ error: "Poll option update failed", details: error.message });
  }
};
