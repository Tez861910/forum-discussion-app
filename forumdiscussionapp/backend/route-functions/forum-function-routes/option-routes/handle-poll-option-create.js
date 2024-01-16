import { sequelize } from "../../../db.js";

export const handlePollOptionCreate = async (req, res) => {
  const { pollId, optionText } = req.body;

  try {
    if (!pollId || !optionText) {
      console.log("PollID and OptionText are required");
      return res
        .status(400)
        .json({ error: "PollID and OptionText are required" });
    }

    const PollOptions = sequelize.models.PollOptions;

    const result = await PollOptions.create({
      PollID: pollId,
      OptionText: optionText,
    });

    if (result) {
      console.log("Poll option created successfully");
      res.json({ message: "Poll option created successfully" });
    } else {
      console.error("Poll option creation failed");
      res.status(500).json({ error: "Poll option creation failed" });
    }
  } catch (error) {
    console.error("Error creating poll option:", error);
    res
      .status(500)
      .json({ error: "Poll option creation failed", details: error.message });
  }
};
